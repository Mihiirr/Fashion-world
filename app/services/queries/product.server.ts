import { redirect } from "@remix-run/node";
import { db } from "../client.server";

interface ImageData {
  name: string;
  type: string;
  size: number;
  filepath: string;
  webkitRelativePath: string;
  lastModified: number;
}

export async function getAllProducts() {
  const product = await db.product.findMany();
  return product;
}

export async function getUniqueProducts(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
}

export async function addAProduct(
  name: string,
  category: string,
  image: FormDataEntryValue,
  price: number,
  inStock?: number,
  isNew?: boolean,
  isFeatured?: boolean
) {
  const imageName = image.name;
  const product = await db.product.create({
    data: {
      name,
      category,
      image: imageName,
      price,
      inStock,
      isNew,
      isFeatured,
    },
  });
  return product;
}

export async function deleteAProduct(productId: string) {
  await db.product.delete({
    where: {
      id: productId,
    },
  });
  return redirect(`/admin/products`);
}

// Admin Panel Services ----------------------------------------------------------------------------------------------------------------

export async function getUniqueCategoryProducts(category: string) {
  const product = await db.product.findMany({
    where: {
      category: category,
    },
  });
  return product;
}

export async function totalVarietyProducts() {
  const totalProducts = await db.product.count();
  return totalProducts > 0 ? totalProducts : 0;
}

export async function StocksInTotal() {
  const totalStocks = await db.product.aggregate({
    _sum: {
      inStock: true,
    },
  });
  return totalStocks._sum.inStock === null ? 0 : totalStocks._sum.inStock;
}

export async function netAmountOfTotalStocks() {
  const stocks = db.product.findMany({
    select: {
      inStock: true,
      price: true,
    },
  });
  const totalPrice = (await stocks).map((items) => items.inStock * items.price);
  const netAmount =
    totalPrice.length > 0
      ? totalPrice.reduce(
          (accumulator: number, curr: number) => accumulator + curr
        )
      : 0;
  return netAmount;
}

// Featured Product Services ----------------------------------------------------------------------------------------------------------------

export function getUniqueCategoryFeaturedProducts(category: string) {
  return db.product.findMany({
    where: { isFeatured: true, category: category },
    select: { id: true, image: true, isNew: true },
    take: 4,
  });
}

export async function addToFeatured(productId: string) {
  await db.product.update({
    data: { isFeatured: true },
    where: { id: productId },
  });
  return redirect(`/admin/products`);
}

export async function removeFromFeatured(productId: string) {
  await db.product.update({
    data: { isFeatured: false },
    where: { id: productId },
  });
  return redirect(`/admin/products`);
}
