import { COUNTRY_CODES } from '../config';

const initialState = { lang: COUNTRY_CODES[1].code };

const settings = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_LANG':
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};

export default settings;
