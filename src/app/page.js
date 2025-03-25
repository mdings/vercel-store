import { getProducts } from "@/providers/sanity/products";
import { CartTrigger, Productcard } from "@/lib/components";

export default async function Home() {
  const products = await getProducts();

  console.log(products);

  return (
    <div>
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
