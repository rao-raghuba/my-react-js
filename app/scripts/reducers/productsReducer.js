import {
  LOAD_PRODUCTS,
  SEARCH_PRODUCTS,
  SUCCESS,
} from "../constants/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `${LOAD_PRODUCTS}_${SUCCESS}`:
    case `${SEARCH_PRODUCTS}_${SUCCESS}`:
      return payload;

    default:
      return state;
  }
};
