import axios from 'axios';

import { SEARCH_TERM, 
         SEARCH_AUTOCOMPLETE,
         SEARCH_REDIRECT,
         CLEAN_TERM,
         CLEAN_SEARCH_REDIRECT,
         SEARCH_ERROR } from './types';

const URL_MERCADOLIBRE = 'https://api.mercadolibre.com/';

const doSearchByTerm = (term, dispatch, actionType) => {
  axios.get(`${URL_MERCADOLIBRE}/sites/MLA/search?q=${term}`)
    .then(response => {
      dispatch({
        type: actionType,
        payload: { term, data: response.data }
      });
    })
    .catch(error => {
      dispatch(searchError(error.response));
    });
};

export const searchAutocomplete = (term) => {
  const thunk = dispatch => {
    doSearchByTerm(term, dispatch, SEARCH_AUTOCOMPLETE);
  };

  thunk.meta = {
    debounce: {
      time: 300,
      key: SEARCH_AUTOCOMPLETE
    }
  };

  return thunk;
};

export const searchByTerm = (term) => (dispatch) => {
  doSearchByTerm(term, dispatch, SEARCH_TERM)
};

export const searchRedirect = (term) => {
  return {
    type: SEARCH_REDIRECT,
    payload: { term }
  };
}

export const cleanTerm = () => {
  return {
    type: CLEAN_TERM
  };
}

export const cleanSearchRedirect = () => {
  return {
    type: CLEAN_SEARCH_REDIRECT
  };
}

function searchError(error) {
  return {
    type: SEARCH_ERROR,
    payload: error
  };
}
