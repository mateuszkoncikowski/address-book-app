import { actionTypes } from '../actions';

const initialState = {
  searchValue: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    default:
      return state;
  }
};

export default search;
