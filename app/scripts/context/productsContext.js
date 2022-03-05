import React, { createContext, useCallback, useMemo, useReducer } from "react";
import {
  FAIL,
  LOAD_PRODUCTS,
  REQUEST,
  RESET_PRODUCTS,
  SEARCH_PRODUCTS,
  SUCCESS,
  NO_PRODUCTS_FOUND
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
      const newArr = Array.from(await json.data);
      console.log('length=', newArr.length);
      if (newArr.length === 0) {
        dispatch({
          type: `${SEARCH_PRODUCTS}_${FAIL}`,
          payload: {
            error:
              { message: "No matching products found...." },
          },
        })
      }
      else {
        dispatch({
          type: `${SEARCH_PRODUCTS}_${SUCCESS}`,
          payload: json.data,
        });
      }
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
