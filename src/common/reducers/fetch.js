import { FETCH_ITEM,
         FETCH_ERROR } from '../actions/types';

const fetch = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return { ...state, error: null, item: action.payload.item };
    case FETCH_ERROR: 
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default fetch;


