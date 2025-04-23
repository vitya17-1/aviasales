const changeSorting = {
  cheap: () => ({ type: 'SET_SORTING_CHEAP' }),
  fast: () => ({ type: 'SET_SORTING_FAST' }),
  opt: () => ({ type: 'SET_SORTING_OPT' }),
};
const { cheap, fast, opt } = changeSorting;

const addFilter = filter => ({ type: 'ADD_FILTER', payload: filter });
const removeFilter = filter => ({ type: 'REMOVE_FILTER', payload: filter });

const showMore = () => ({ type: 'SHOW_MORE' });
const resetVisibleTicketsCount = () => ({
  type: 'RESET_VISIBLE_TICKETS_COUNT',
});
const allDataLoaded = () => ({ type: 'ALL_DATA_LOADED' });
const cacheUpdateErrorOccurred = errorMessage => ({
  type: 'CACHE_UPDATE_ERROR_OCCURRED',
  payload: errorMessage,
});

export {
  cacheUpdateErrorOccurred,
  allDataLoaded,
  changeSorting,
  cheap,
  fast,
  opt,
  addFilter,
  removeFilter,
  showMore,
  resetVisibleTicketsCount,
};
