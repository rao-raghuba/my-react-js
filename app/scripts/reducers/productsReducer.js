import {
  LOAD_PRODUCTS,
  NO_PRODUCTS_FOUND,
  RESET_PRODUCTS,
  SEARCH_PRODUCTS,
  SUCCESS,
} from "../constants/actionTypes";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  console.log("productsReducer");
  switch (type) {
    case `${LOAD_PRODUCTS}_${SUCCESS}`:
    case `${SEARCH_PRODUCTS}_${SUCCESS}`:
      return payload;

    case RESET_PRODUCTS:
      return initialState;
    case NO_PRODUCTS_FOUND:
      return [{ type: NO_PRODUCTS_FOUND, message: "No Matching products found" }]

    default:
      return state;
  }
};
