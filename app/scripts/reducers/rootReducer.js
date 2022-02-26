import errorsReducer from "./errorsReducer"
import loadingReducer from "./loadingReducer"
import productsReducer from "./productsReducer"
import searchTermReducer from "./searchTermReducer"

export const initialRootState = {
  products: [],
  errors: [],
  loading: [],
  searchTerm: ''
}

export default (state = initialRootState, action) => {
  console.log("rootReducer");
  return {
    products: productsReducer(state.products, action),
    errors: errorsReducer(state.errors, action),
    loading: loadingReducer(state.loading, action),
    searchTerm: searchTermReducer(state.searchTerm, action)
  }
}
