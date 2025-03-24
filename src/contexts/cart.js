import React, { createContext, useState, useMemo, useEffect } from "react";
import localforage from "localforage";

export const CartContext = createContext();

let timer = null;

export const CartContextProvider = ({ children }) => {
  const [cartVisible, setCartVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  function toggleCart() {
    setCartVisible(!cartVisible);
  }

  function hideCart() {
    setCartVisible(false);
  }

  function showToast() {
    setToastVisible(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  }

  // Load cartItems from localforage when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      const storedItems = await localforage.getItem("cartItems");
      setCartItems(storedItems || []);
    };

    fetchCartItems().catch((err) => {
      console.error("Failed to load cart items from localforage:", err);
    });
  }, []);

  // Persist cartItems to localforage whenever it gets updated
  useEffect(() => {
    localforage.setItem("cartItems", cartItems).catch((err) => {
      console.error("Failed to save cart items to localforage:", err);
    });
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setCartTotal(total);
  }, [cartItems]);

  const cart = useMemo(() => {
    return {
      items: cartItems,
      cartItems,
      cartVisible,
      toastVisible,
      cartTotal,
      toggleCart,
      hideCart,
      showToast,
      setCartItems,
    };
  }, [cartItems, cartVisible, toastVisible, cartTotal]);

  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
};
