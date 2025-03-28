import {
  getProductsByCategory,
  getCategoryBySlug,
} from "@/providers/sanity/products";
import { Productcard } from "@/lib/components";

export const metadata = {
  title: "Jack Hunt - Serious about sustainable skin care for men",
  description: "Generated by create next app",
};

export default async function Product(props) {
  const { slug } = await props.params;
  const [products, category] = await Promise.all([
    getProductsByCategory(slug),
    getCategoryBySlug(slug),
  ]);

  return (
    <div className="flex flex-col gap-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-10">
        <span className="text-4xl md:6-xl lg:text-7xl font-bold underline underline-offset-5 decoration-[#EEB4B3] max-w-md">
          {category.name}
        </span>
        <p className="max-w-prose whitespace-pre-line text-lg">
          {category.description}
        </p>
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 md:gap-y-12">
          {products.map((product) => {
            return (
              <div key={product._id}>
                <Productcard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
