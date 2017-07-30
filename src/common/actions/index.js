import { SEARCH_TERM, 
         SEARCH_AUTOCOMPLETE,
         SEARCH_ERROR } from './types';

const URL_MERCADOLIBRE = 'https://api.mercadolibre.com/';

const searchByTerm = (term, dispatch, actionType) => {
  axios.get(`${URL_MERCADOLIBRE}/sites/MLA/search?q=${term}`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: actionType,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch(searchError(error.response));
    });
};

export const searchAutocomplete = (term) => {
  const thunk = dispatch => {
    searchByTerm(term, dispatch, SEARCH_AUTOCOMPLETE);
  };

  thunk.meta = {
    debounce: {
      time: 700,
      key: SEARCH_AUTOCOMPLETE
    }
  };

  return thunk;
};

export const searchByTerm = (term) => (dispatch) => {
  searchByTerm(term, dispatch, SEARCH_TERM)
};

export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    payload: error
  };
}
