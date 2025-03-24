"use client";

import { CartContextProvider } from "@/contexts/cart";

export default function Context({ children }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
