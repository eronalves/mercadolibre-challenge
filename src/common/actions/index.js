import axios from 'axios';

import { SEARCH_TERM, 
         SEARCH_AUTOCOMPLETE,
         SEARCH_REDIRECT,
         CLEAN_TERM,
         CLEAN_SEARCH_REDIRECT,
         SEARCH_ERROR } from './types';

const URL_API = process.env.RAZZLE_URL_API;

const doSearchByTerm = (term, dispatch, actionType, mapPayload) => {
  const url = `${URL_API}/items?q=${term}`;
  axios.get(url)
    .then(response => {
      let payload = { term, data: response.data };
      if (mapPayload) {
        payload = mapPayload(payload);
      }
      dispatch({
        type: actionType,
        payload: payload
      });
    })
    .catch(error => {
      console.log(error);
      dispatch(searchError(error.response));
    });
};

export const searchAutocomplete = (term) => {
  const thunk = dispatch => {
    doSearchByTerm(term, dispatch, SEARCH_AUTOCOMPLETE);
  };

  thunk.meta = {
    debounce: {
      time: 200,
      key: SEARCH_AUTOCOMPLETE
    }
  };

  return thunk;
};

const mapPayloadCategories = (payload) => {
  const categories = payload.data.categories;
  if (categories && (categories.length > 4)) {
    payload.data.categories = categories.slice((categories.length -4), categories.length); 
  }

  return payload;
};

export const searchByTerm = (term) => (dispatch) => {
  doSearchByTerm(term, dispatch, SEARCH_TERM, mapPayloadCategories)
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
