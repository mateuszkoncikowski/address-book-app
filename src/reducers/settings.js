import { COUNTRY_CODES } from '../config';
import { actionTypes } from '../actions';

const initialState = {
  lang: COUNTRY_CODES[1].code,
  batchSize: 100,
  fetchLimit: 1000,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANG:
      return {
        ...state,
        lang: action.lang,
      };
    case actionTypes.SET_FETCH_BATCH_SIZE:
      return {
        ...state,
        batchSize: action.size,
      };
    case actionTypes.SET_FETCH_LIMIT:
      return {
        ...state,
        fetchLimit: action.limit,
      };
    default:
      return state;
  }
};

export default settings;
