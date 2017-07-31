import axios from 'axios';

import { SEARCH_TERM, 
         SEARCH_AUTOCOMPLETE,
         SEARCH_REDIRECT,
         FETCH_ITEM,
         CLEAN_TERM,
         CLEAN_SEARCH_REDIRECT,
         FETCH_ERROR,
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

const sliceLastFourElements = (array) => {
  return (array && (array.length > 4)) ?  array.slice((array.length -4), array.length) : array;
}

const sliceFirstFourElements = (array) => {
  return (array && (array.length > 4)) ?  array.slice(0, 4) : array;
}

const mapPayloadSearch = (payload) => {
  payload.data.categories = sliceLastFourElements(payload.data.categories);
  payload.data.items = sliceFirstFourElements(payload.data.items);
  return payload;
};

export const searchByTerm = (term) => (dispatch) => {
  doSearchByTerm(term, dispatch, SEARCH_TERM, mapPayloadSearch)
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

export const fetchItem = (id) => dispatch => {
  const url = `${URL_API}/items/${id}`;
  axios.get(url)
    .then(response => {
      dispatch({
        type: FETCH_ITEM,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(fetchError(error.response));
    });
}

function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error
  };
}

function searchError(error) {
  return {
    type: SEARCH_ERROR,
    payload: error
  };
}
