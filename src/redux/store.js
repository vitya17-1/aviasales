/* eslint-disable default-param-last */
/* eslint-disable no-bitwise */
import { configureStore } from '@reduxjs/toolkit';

import { aviasalesApi } from '../services/aviasalesApi';
import { CheckboxStateManager } from '../utils/utils';

import FILTERS from './constants';

const sortingReducer = (state = 'cheap', action) => {
  switch (action.type) {
    case 'SET_SORTING_CHEAP':
      return 'cheap';
    case 'SET_SORTING_FAST':
      return 'fast';
    case 'SET_SORTING_OPT':
      return 'opt';
    default:
      return state;
  }
};

const csm = new CheckboxStateManager(FILTERS);
const filterReducerInitialState = csm.getAllCheckedState();
const filterReducer = (state = filterReducerInitialState, action) => {
  let newState = state;
  const checkedFilterName = action.payload;

  switch (action.type) {
    case 'ADD_FILTER': {
      newState = csm.add2State(state, checkedFilterName);
      return newState;
    }
    case 'REMOVE_FILTER': {
      newState = csm.removeFromState(state, checkedFilterName);
      return newState;
    }
    default:
      return state;
  }
};

const showMoreReducer = (state = 5, action) => {
  if (action.type === 'SHOW_MORE') {
    const nwState = state + 5;
    return nwState;
  }
  if (action.type === 'RESET_VISIBLE_TICKETS_COUNT') {
    return 5;
  }
  return state;
};

const dataLoadingStatusReducer = (state = false, action) => {
  switch (action.type) {
    case 'ALL_DATA_LOADED':
      return true;
    default:
      return state;
  }
};

const cacheUpdateErrorOccurredReducer = (state = '', action) => {
  switch (action.type) {
    case 'CACHE_UPDATE_ERROR_OCCURRED':
      return action.payload;
    default:
      return state;
  }
};

export default configureStore({
  reducer: {
    [aviasalesApi.reducerPath]: aviasalesApi.reducer,
    sorting: sortingReducer,
    filter: filterReducer,
    visibleTicketsCount: showMoreReducer,
    isDataLoaded: dataLoadingStatusReducer,
    cacheUpdateErrorMsg: cacheUpdateErrorOccurredReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(aviasalesApi.middleware),
});
