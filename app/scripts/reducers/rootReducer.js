import errorsReducer from "./errorsReducer"
import loadingReducer from "./loadingReducer"
import productsReducer from "./productsReducer"

export const initialRootState = {
    products: [],
    errors: [],
    loading: []
}

export default (state = initialRootState, action) => {
  return {
    products: productsReducer(state.products, action),
    errors: errorsReducer(state.errors, action),
    loading: loadingReducer(state.loading, action)
  }
}
