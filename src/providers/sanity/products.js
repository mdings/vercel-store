import client from ".";

export async function getProductBySlug(slug) {
  console.log(slug);
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{_id, content, slug, price, _createdAt, stock, discontinued, sold, brand->{_id, name}}`,
    { slug }
  );
  return product;
}

export async function getProducts() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current)]{_id, name, slug, content, price, _createdAt, stock, sold, discontinued, brand->{_id, name}}`,
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
