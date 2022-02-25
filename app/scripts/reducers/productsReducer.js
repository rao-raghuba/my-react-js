import { LOAD_PRODUCTS, SEARCH_PRODUCTS, SUCCESS } from "../constants/actionTypes"

const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case `${LOAD_PRODUCTS}_${SUCCESS}`:
    return { ...state, ...payload }

 case `${SEARCH_PRODUCTS}_${SUCCESS}`:
    return { ...state, ...payload }

  default:
    return state
  }
}
