"use client";

import React, { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";
import localforage from "localforage";

export function CartTrigger() {
  const { cart } = useContext(CartContext);
  return (
    <div
      className="hidden md:flex gap-2 items-baseline cursor-pointer bg-[#00000020] hover:bg-[#00000060] px-1 py-1 pl-3 transition-colors rounded-sm self-center"
      onClick={(e) => cart.toggleCart()}
    >
      <span className="whitespace-nowrap">💰 Cart</span>
      <span className="text-sm font-medium bg-[#E5E5E5] rounded-sm text-black w-20 text-center py-2 whitespace-nowrap">
        &euro; {cart.cartTotal.toFixed(2)}
      </span>
    </div>
  );
}

export function Cart() {
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
        className="fixed w-screen h-screen z-20 left-0 top-0 bg-[#ffffff95] opacity-0 pointer-events-none data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto transition-all"
        data-visible={cart.cartVisible.toString()}
        onClick={toggleCart}
      ></div>
      <div
        className="fixed z-20 -right-10 top-0 h-full w-[600px] bg-white text-black overflow-auto translate-x-full data-[show=true]:translate-x-0 transition-transform"
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
