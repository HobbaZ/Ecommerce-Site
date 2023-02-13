import { createContext, useReducer, useState } from "react";

export const Store = createContext();

export function StoreProvider(props) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((product) => product.id !== itemId));
  };

  return (
    <Store.Provider value={{ cart, addToCart, removeFromCart }}>
      {props.children}
    </Store.Provider>
  );
}
