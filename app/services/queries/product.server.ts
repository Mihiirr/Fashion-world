import { db } from "../client.server";

export async function getAllProducts() {
  const product = await db.product.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      image: true,
      price: true,
      inStock: true,
      rating: true,
      isFeatured: true,
      isNew: true,
    },
  });
  return product;
}

export async function addAProduct(
  name: string,
  category: string,
  image: string,
  price: number,
  inStock: number,
  isNew?: boolean,
  isFeatured?: boolean
) {
  const product = await db.product.create({
    data: {
      name,
      category,
      image,
      price,
      inStock,
      isNew,
      isFeatured,
    },
  });
  return product;
}
