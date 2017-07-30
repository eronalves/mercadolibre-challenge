import { SEARCH_AUTOCOMPLETE,
         SEARCH_TERM,
         SEARCH_REDIRECT,
         CLEAN_TERM,
         CLEAN_SEARCH_REDIRECT,
         SEARCH_ERROR } from '../actions/types';

const search = (state = {}, action) => {
  console.log('reducer', action);
  switch (action.type) {
    case SEARCH_AUTOCOMPLETE:
      return { ...state, searchError: null, itemsAutoComplete: action.payload.data };
    case SEARCH_TERM:
      return { ...state, searchError: null, term: action.payload.term, items: action.payload };
    case SEARCH_REDIRECT:
      return { ...state, termRedirect: action.payload.term };
    case CLEAN_TERM:
      return { ...state, term: '' };
    case CLEAN_SEARCH_REDIRECT:
      return { ...state, termRedirect: '' };
    case SEARCH_ERROR:
      return { ...state, searchError: action.payload };
    default:
      return state;
  }
};

export default search;


