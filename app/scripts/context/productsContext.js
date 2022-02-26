import React, { createContext, useCallback, useMemo, useReducer } from "react";
import {
  FAIL,
  LOAD_PRODUCTS,
  REQUEST,
  RESET_PRODUCTS,
  RESET_SEARCH_TERM,
  SEARCH_PRODUCTS,
  SUCCESS,
} from "../constants/actionTypes";
import rootReducer, { initialRootState } from "../reducers/rootReducer";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  const loadProducts = useCallback(async () => {
    try {
      dispatch({
        type: `${LOAD_PRODUCTS}_${REQUEST}`,
        payload: { message: "Loading Products..." },
      });
      const res = await fetch("http://localhost:3035/products");
      const json = await res.json();
      dispatch({
        type: `${LOAD_PRODUCTS}_${SUCCESS}`,
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: `${LOAD_PRODUCTS}_${FAIL}`,
        payload: {
          error,
          message: "Load products failed...",
        },
      });
    }
  });

  const searchProducts = useCallback(async (value) => {
    try {
      dispatch({
        type: `${SEARCH_PRODUCTS}_${REQUEST}`,
        payload: { message: "Searching Products..." },
      });
      const res = await fetch(`http://localhost:3035/products?search=${value}`);
      const json = await res.json();
      dispatch({
        type: `${SEARCH_PRODUCTS}_${SUCCESS}`,
        payload: json.data,
      });
      resetSearchTerm();
    } catch (error) {
      dispatch({
        type: `${SEARCH_PRODUCTS}_${FAIL}`,
        payload: {
          error,
          message: "Search products failed..",
        },
      });
    }
  });

  const resetProducts = useCallback(() => {
    dispatch({ type: RESET_PRODUCTS });
  }, []);
  const resetSearchTerm = useCallback(() => {
    document.getElementById('searchTermInput').value = '';
    document.getElementById('searchBar').style.display = 'none';
  }, [])
  const value = useMemo(
    () => ({ loadProducts, searchProducts, resetProducts, ...state }),
    [loadProducts, searchProducts, resetProducts, state]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
