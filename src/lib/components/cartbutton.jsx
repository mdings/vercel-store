"use client";

import { CartContext } from "@/contexts/cart";
import React, { useContext } from "react";

export function Cartbutton({ product, variant = "dark" }) {
  const { cart } = useContext(CartContext);
  const { setCartItems, cartItems } = cart;

  function AddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setCartItems(cartItems.concat(product));
  }

  return (
    <button
      className="text-white w-full p-2 bg-[#28367699] hover:bg-[#283676] transition-colors cursor-pointer data-[variant=light]:bg-[#283676] data-[variant=light]:hover:bg-[#1F2A5B]"
      onClick={(e) => AddToCart(e, product)}
      data-variant={variant}
    >
      Add to cart
    </button>
  );
}
