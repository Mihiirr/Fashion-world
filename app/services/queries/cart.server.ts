import { redirect } from "@remix-run/node";
import { db } from "../client.server";

export async function getCartItems(userId: string) {
  const cartItems = await db.cart.findMany({
    where: {
      userId,
    },
  });

  const totalCartItems = await db.cart.groupBy({
    by: ["userId"],
    _count: {
      productId: true,
    },
  });
  return { cartItems, totalCartItems };
}

export function addToCart(userId: string, productId: string) {
  return db.cart.create({
    data: {
      userId,
      productId,
    },
  });
}

export async function removeFromCart(id: string) {
  await db.cart.delete({
    where: {
      id,
    },
  });
  return redirect(`/cart`);
}
