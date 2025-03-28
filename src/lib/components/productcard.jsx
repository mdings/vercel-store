"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";

function contentfulImageLoader({ src, width }) {
  return `${src}&w=${width}`;
}

export function Productcard({ product }) {
  const { cart } = useContext(CartContext);
  const { setCartItems, cartItems } = cart;

  function AddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setCartItems(cartItems.concat(product));
  }

  return (
    <Link href={`/product/${product.slug?.current}`} prefetch={true}>
      <div className="bg-[#ffffff09] rounded relative cursor-pointer h-full flex flex-col justify-between overflow-hidden">
        <div className="w-full">
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-10">
            {product.metadata?.tags?.map((label, i) => {
              return (
                label.sys.id.startsWith("label") && (
                  <div
                    key={i}
                    className="bg-[#F896D8] text-black px-2 py-1 text-xs uppercase font-bold rounded-sm"
                  >
                    {label.sys.id.replace("label", "")}
                  </div>
                )
              );
            })}
          </div>
          <div className="flex flex-col p-3 md:p-4 pt-5 md:pt-10 gap-6">
            <div className="relative max-w-full h-auto min-h-[200px] md:h-[400px] md:max-w-sm self-center w-full">
              {product.images?.length > 0 && (
                <Image
                  loader={contentfulImageLoader}
                  className="object-contain p-3"
                  src={`${product.images[0].url}?fm=webp&q=75`}
                  fill={true}
                  alt={`Product shot for ${product.brand.name} ${product.name}`}
                  sizes="(max-width: 768px) 100vw, 600px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={`${product.images[0].url}?w=50&fm=webp&q=20`}
                />
              )}
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
        </div>

        <div className="w-full">
          <button
            className="text-white w-full p-2 bg-[#28367699] hover:bg-[#283676] transition-colors cursor-pointer"
            onClick={(e) => AddToCart(e, product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}
