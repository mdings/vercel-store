"use client";

import Image from "next/image";
import Link from "next/link";
// import Cartbutton from './cartbutton'
import React, { useContext, useState } from "react";
import { CartContext } from "@/contexts/cart";
// import Store from '../global-context';
// import { Addtocart } from './cartbutton.actions';

function contentfulImageLoader({ src, width }) {
  return src;
}

export function Productcard({ product }) {
  // const store = useContext(Store);

  const { cart } = useContext(CartContext);
  const { setCartTotal, setCartItems, cartItems, showToast } = cart;

  function AddToCart(e, product) {
    e.preventDefault();
    e.stopPropagation();
    setCartItems(cartItems.concat(product));
    // showToast();
    // toggleVisible();
  }

  console.log(product.images);

  return (
    <Link href={`/product/${product.slug?.current}`}>
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
            {/* {product?.images && (
              <Image
                className="mx-auto pt-5 w-full max-w-[200px] h-auto"
                src={product.images[0].asset.url}
                width="0"
                height="0"
                alt={`${product.brand.name} ${product.name}`}
                sizes="600px"
              />
            )} */}
            <div className="relative max-w-full h-auto min-h-[200px] md:h-[400px] md:max-w-sm self-center w-full">
              {product.images?.length > 0 && (
                <Image
                  loader={contentfulImageLoader}
                  className="object-contain p-3"
                  src={product.images[0].url}
                  fill={true}
                  alt={`${product.brand.name} ${product.name}`}
                  sizes="600px"
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
        <span className="text-white" onClick={(e) => AddToCart(e, product)}>
          Add to cart
        </span>
        {/* <Cartbutton product={product} className="w-full" onClick={e => Addtocart(e, product, store)} /> */}
      </div>
    </Link>
  );
}
