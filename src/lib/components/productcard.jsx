"use client";

import Link from "next/link";
import React from "react";
import { Cartbutton, Productimage } from "@/lib/components";

export function Productcard({ product }) {
  return (
    <Link href={`/product/${product.slug?.current}`} prefetch={true}>
      <div className="bg-[#ffffff09] rounded relative cursor-pointer h-full flex flex-col justify-between overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex flex-col p-3 md:p-4 pt-5 md:pt-10 gap-6">
            <div className="relative max-w-full h-auto min-h-[200px] md:h-[400px] md:max-w-sm self-center w-full">
              {product.images?.length > 0 && <Productimage product={product} />}
            </div>
            <div className="flex flex-col gap-2">
              <div className="md:max-w-xs">
                <span className="text-white text-sm lg:text-lg">
                  {product.brand.name} {product.name}
                </span>
              </div>

              <span className="text-white text-sm lg:text-md opacity-80 gap-1 flex items-baseline">
                {product.discount && (
                  <span className="bg-[#e1ef70] text-black px-2 py-1 text-xs uppercase font-bold rounded-sm">
                    -{product.discount}%
                  </span>
                )}
                {product.discount && (
                  <span className="text-[#ffffff] text-sm lg:text-md opacity-90 line-through">
                    &euro;{product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="font-bolder">
                  &euro;{product.price.toFixed(2)}
                </span>
                {product.content && (
                  <span className="hidden sm:block nowrap ">
                    ⎯ {product.content}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="w-full">
            <Cartbutton product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
}
