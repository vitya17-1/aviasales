/* eslint-disable no-await-in-loop */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { v4 as uuidv4 } from 'uuid';

import { throttle } from '../utils/utils';

const AVIASALES_API_URL = 'https://aviasales-test-api.kata.academy';
const THROTTLE_QUERY_DELAY = 100;

const updateTicketsWithID = tickets => {
  tickets.forEach(ticket => {
    // eslint-disable-next-line no-param-reassign
    ticket.id = uuidv4();
  });
  return tickets;
};

const withRetry =
  (fn, maxRetries = 3) =>
  async (...args) => {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await fn(...args);
      } catch (error) {
        if (retries === maxRetries) return '';
        retries += 1;
      }
    }
    return '';
  };

export const aviasalesApi = createApi({
  reducerPath: 'aviasalesApi',
  endpoints: builder => ({
    getTickets: builder.query({
      queryFn: () => ({ data: { tickets: [], error: '' } }),
      onCacheEntryAdded: async (
        _,
        { updateCachedData, cacheDataLoaded, dispatch }
      ) => {
        const getSearchId = async () => {
          const searchIdQuery = await fetchBaseQuery({
            baseUrl: AVIASALES_API_URL,
          })('/search', { method: 'GET' });
          if (searchIdQuery?.error) {
            throw searchIdQuery.error;
          }
          const { searchId } = searchIdQuery.data;
          return searchId;
        };
        const getSearchIdWithRetry = withRetry(getSearchId, 3);

        let stop = false;
        const getTickets = throttle(async searchId => {
          const fetchTicketsRslt = await fetchBaseQuery({
            baseUrl: AVIASALES_API_URL,
          })(`/tickets?searchId=${searchId}`, {
            method: 'GET',
          }).then(res => {
            if (res?.error && res.error.status !== 500) {
              throw res.error;
            }
            return res;
          });
          if (fetchTicketsRslt?.data) {
            const updatedTickets = updateTicketsWithID(
              fetchTicketsRslt.data.tickets
            );
            stop = fetchTicketsRslt.data.stop;
            updateCachedData(draft => {
              draft.tickets.push(...updatedTickets);
            });
          }
        }, THROTTLE_QUERY_DELAY);

        try {
          await cacheDataLoaded;
          const searchId = await getSearchIdWithRetry();
          if (!searchId) throw new Error('Не удалось получить searchId');
          while (!stop) {
            await getTickets(searchId);
          }
          dispatch({ type: 'ALL_DATA_LOADED' });
        } catch (error) {
          dispatch({
            type: 'CACHE_UPDATE_ERROR_OCCURRED',
            payload: error?.message,
          });
        }
      },
    }),
  }),
});

export const { useGetTicketsQuery } = aviasalesApi;
