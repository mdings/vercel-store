import client from ".";

export async function getProductById(id) {
  const products = await client.fetch(
    `*[_id == "${id}"]{_id, content, price, _createdAt, stock, discontinued, sold, brand->{_id, name}}`,
    {}
  );
  return products[0];
}

export async function getProducts() {
  const products = await client.fetch(
    `*[_type == "product"]{_id, name, content, price, _createdAt, stock, sold, discontinued, brand->{_id, name}}`,
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
