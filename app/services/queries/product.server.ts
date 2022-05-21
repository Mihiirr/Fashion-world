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

export async function totalProductCount() {
  const totalProducts = db.product.count();
  return totalProducts;
}
export async function netAmountOfTotalProduct() {
  const netAmount = db.product.aggregate({
    _sum: {
      price: true,
    },
  });
  return netAmount;
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

export function getAllFeaturedProduct() {
  return db.product.findMany({
    where: { isFeatured: true },
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
    take: 4,
  });
}

export function addToFeatured(productId: string) {
  return db.product.update({
    data: { isFeatured: true },
    where: { id: productId },
  });
}

export async function removeFromFeatured(productId: string) {
  return db.product.update({
    data: { isFeatured: false },
    where: { id: productId },
  });
}
