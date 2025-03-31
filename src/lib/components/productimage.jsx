"use client";

import Image from "next/image";

function sanityImageLoader({ src, width }) {
  return `${src}&w=${width}`;
}

export function Productimage({
  product,
  priority = false,
  quality = 75,
  size = "300px",
  pad = 0,
}) {
  return (
    <Image
      loader={sanityImageLoader}
      className="object-contain p-3"
      src={`${product.images[0].url}?fm=webp&q=${quality}&pad=${pad}`}
      fill={true}
      alt={`Product shot for ${product.brand.name} ${product.name}`}
      sizes={`(max-width: 768px) 100vw, ${size}`}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      placeholder="blur"
      blurDataURL={`${product.images[0].url}?w=50&fm=webp&q=20`}
    />
  );
}
