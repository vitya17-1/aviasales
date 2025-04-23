/* eslint-disable no-bitwise */
import { useSelector } from 'react-redux';

import { useGetTicketsQuery } from '../services/aviasalesApi';
import FILTERS from '../redux/constants';

const useTickets = () => {
  const sortTickets = sorting => tickets => {
    // eslint-disable-next-line array-callback-return, consistent-return
    return tickets.sort((a, b) => {
      if (sorting === 'cheap') {
        return a.price - b.price;
      }
      if (sorting === 'fast') {
        return (
          a.segments.reduce((sum, segment) => sum + segment.duration, 0) -
          b.segments.reduce((sum, segment) => sum + segment.duration, 0)
        );
      }
      if (sorting === 'opt') {
        const durationA = a.segments.reduce(
          (sum, segment) => sum + segment.duration,
          0
        );
        const durationB = b.segments.reduce(
          (sum, segment) => sum + segment.duration,
          0
        );
        const priceA = a.price;
        const priceB = b.price;
        const scoreA = priceA + durationA;
        const scoreB = priceB + durationB;

        return scoreA - scoreB;
      }
    });
  };

  const filterTickets = filters => tickets =>
    tickets.filter(
      ticket =>
        filters & FILTERS.ALL.mask ||
        ticket.segments.every(segment => filters & (2 << segment.stops.length))
    );

  const processTickets = (filters, sorting) => tickets => {
    return sortTickets(sorting)(filterTickets(filters)(tickets));
  };

  const sorting = useSelector(state => state.sorting);
  const filters = useSelector(state => state.filter);
  const ticketsCount2Show = useSelector(state => state.visibleTicketsCount);

  const { tickets } = useGetTicketsQuery(undefined, {
    selectFromResult: ({ data: { tickets: ticketsArr } }) => {
      if (!ticketsArr) return { tickets: [] };
      const copyOfTicketsArr = [...ticketsArr];
      const processedTickets = processTickets(
        filters,
        sorting
      )(copyOfTicketsArr);
      return { tickets: processedTickets.slice(0, ticketsCount2Show) ?? [] };
    },
  });

  return { tickets };
};

export default useTickets;
