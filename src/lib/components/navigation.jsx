import Link from "next/link";
import React from "react";
import { CartTrigger } from "@/lib/components";
const items = ["Home", "Shampoo", "Skincare", "Beards", "Deodorants"];

export function Navigation({ children, className = "", navigation }) {
  return (
    <nav className="sticky top-2 z-10 flex justify-between  bg-[#ff5715] md:flex py-2 px-3 my-8 mb-5 rounded-sm rounded-b-none">
      <ul className="flex text-black">
        {items.map((item, i) => {
          return (
            <li
              key={`nav-item-${i}`}
              className="font-bold text-lg border-r-[1px] border-[#bf4113] cursor-pointer hover:bg-[#bf4113] transition-colors whitespace-nowrap"
            >
              <Link href={"/"} className="p-4 block">
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
      <CartTrigger />
    </nav>
  );
}
