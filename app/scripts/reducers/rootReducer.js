import errorReducer from "./errorReducer"
import loadingReducer from "./loadingReducer"
import productsReducer from "./productsReducer"

export const initialRootState = {
    products: [],
    errors: [],
    loading: []
}

export default (state, action) => {
  return {
    products: productsReducer(state.products, action),
    errors: errorReducer(state.errors, action),
    loading: loadingReducer(state.loading, action)
  }
}
