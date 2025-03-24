import { getProducts } from "@/providers/sanity/products";
import Productcard from "@/lib/components/productcard";
import { CartTrigger } from "@/lib/components/cart";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <CartTrigger />
      <h1>Products {products.length}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-6 md:gap-y-12 container-full">
        {products.map((product) => {
          return (
            <div key={product._id}>
              <Productcard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
