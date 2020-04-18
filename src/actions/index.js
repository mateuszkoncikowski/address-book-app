export const actionTypes = {
  SET_LANG: 'SET_LANG',
  SET_FETCH_BATCH_SIZE: 'SET_BATCH_SIZE',
  SET_FETCH_LIMIT: 'SET_TOTAL_FETCH_ITEMS',
  SET_SEARCH_VALUE: 'SET_SEARCH_VALUE',
};

export const setFetchBatchSize = (size) => ({
  type: actionTypes.SET_FETCH_BATCH_SIZE,
  size,
});

export const setFetchLimit = (limit) => ({
  type: actionTypes.SET_FETCH_LIMIT,
  limit,
});

export const switchLanguage = (lang) => ({
  type: actionTypes.SET_LANG,
  lang,
});

export const setSearchValue = (value) => ({
  type: actionTypes.SET_SEARCH_VALUE,
  searchValue: value,
});
