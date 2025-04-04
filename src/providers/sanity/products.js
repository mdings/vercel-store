import client from ".";

export async function getProductBySlug(slug) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{_id, content, name, slug, price, _createdAt, stock, discontinued, sold, "images": images[]{"url": asset->url, "alt": alt }, brand->{_id, name}}`,
    { slug }
  );
  return product;
}

export async function getCategoryBySlug(slug) {
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{_id, name, description, "products": *[_type == "product" && references(^._id)]{_id, name, slug}}`,
    { slug }
  );
  return category;
}

export async function getProductsByCategory(slug) {
  const products = await client.fetch(
    `*[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)]{_id, name, slug, content, price, _createdAt, stock, sold, discontinued, "images": images[]{"url": asset->url, "alt": alt },brand->{_id, name}}`,
    { slug }
  );
  return products;
}

export async function getProducts() {
  const products = await client.fetch(
    // Only get the products that have a slug and images defined for the demo
    `*[_type == "product" && defined(slug.current) && defined(images)]{_id, name, slug, content, price, _createdAt, stock, sold, discontinued, "images": images[]{"url": asset->url, "alt": alt }, brand->{_id, name}}`,
    {}
  );
  return products;
}

export async function getValidationProducts() {
  const products = await client.fetch(
    `*[_type == "product"]{'id': _id, 'type': 'product', 'url': '/api/validation/product-feed', name, price, stock, 'inventoryManagementMethod': 'single', brand->{_id, name},'allowOutOfStockPurchases': true}`,
    {}
  );
  return products;
}
