import { SEARCH_AUTOCOMPLETE,
         SEARCH_TERM,
         SEARCH_ERROR } from '../actions/types';

const search = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_AUTOCOMPLETE:
      return { ...state, searchError: null, itemsAutoComplete: action.payload };
    case SEARCH_TERM:
      return { ...state, searchError: null, items: action.payload };
    case SEARCH_ERROR:
      return { ...state, searchError: action.payload };
    default:
      return state;
  }
};

export default search;


