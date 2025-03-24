"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";
import localforage from "localforage";

export function CartTrigger() {
  const { cart } = useContext(CartContext);
  return (
    <span onClick={() => cart.toggleCart()}>
      Winkelmandje &euro; {cart.cartTotal}
    </span>
  );
}

export default function Cart() {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { setCartItems, toggleCart } = cart;

  function Remove(index) {
    let newItems = cart.items.filter((item, i) => i !== index);
    setCartItems(newItems);
  }

  async function Checkout() {
    setLoading(true);
    const items = await localforage.getItem("cartItems");
    const data = await fetch("/api/stripe-checkout", {
      method: "POST",
      body: JSON.stringify({ items }),
    }).then((res) => res.json());
    if (data.url) {
      window.location.href = data.url;
      return;
    }
  }

  return (
    <>
      <div
        className="fixed right-0 top-0 h-full w-[600px] bg-white text-black overflow-auto translate-x-full data-[show=true]:translate-x-0 transition-transform"
        data-show={cart.cartVisible.toString()}
      >
        <span onClick={toggleCart}>Verder winkelen</span>
        {cart.items.map((item, index) => (
          <div key={"cart-item" + index}>
            <h3>{item.name}</h3>
            <span>{item.price}</span>
            <span onClick={() => Remove(index)}>delete</span>
          </div>
        ))}
        <span onClick={(e) => Checkout()}>Betalen mannuh</span>
      </div>

      <div
        className="fixed -bottom-11 left-1/2 -translate-x-1/2 bg-red-400 data-[show=true]:bottom-11 transition-all"
        data-show={cart.toastVisible.toString()}
      >
        Added to the cart mane
      </div>
    </>
  );
}
