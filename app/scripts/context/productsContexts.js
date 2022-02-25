import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  FAIL,
  LOAD_PRODUCTS,
  REQUEST,
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
        payload: { message: "Loading Products.." },
      });
      const res = await fetch("http://localhost:3035/products");
      const json = await res.json();
      dispatch({
        type: `${LOAD_PRODUCTS}_${SUCCESS}`,
        payload: json,
      });
    } catch (error) {
      dispatch({
        type: `${LOAD_PRODUCTS}_${FAIL}`,
        payload: { error, message: "load products fail..." },
      });
    }
  }, []);

  const searchProducts = useCallback(async (search) => {
    try {
      dispatch({
        type: `${SEARCH_PRODUCTS}_${REQUEST}`,
        payload: { message: "Searching Products..." },
      });
      const res = await fetch(
        `http://localhost:3035/products?search=${search}`
      );
      const json = await res.json();
      dispatch({
        type: `${SEARCH_PRODUCTS}_${SUCCESS}`,
        payload: json,
      });
    } catch (error) {
      dispatch({
        type: `${SEARCH_PRODUCTS}_${FAIL}`,
        payload: { message: "Searching Products Fail" },
        error,
      });
    }
  }, []);

  const value = useMemo(
    () => ({ loadProducts, searchProducts, ...state }),
    [state, loadProducts, searchProducts]
  );

  return (
    <ProductsContext.Provider
      value={value}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
