import { createContext, useContext, useReducer } from "react";
import rootReducer, { initialRootState } from "../reducers/rootReducer";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialRootState);

  const loadProducts = async () => {
    try {
        
    } catch (error) {
        
    }
  }

  return (
    <ProductsContext.Provider value={{ loadProducts, ...state}}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);



