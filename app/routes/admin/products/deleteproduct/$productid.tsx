import { LoaderFunction, redirect } from "@remix-run/node";
import React from "react";
import { deleteAProduct } from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = await params.productid;
  if (typeof id !== "string") return redirect(`/admin/products`);
  await deleteAProduct(id);
  return redirect(`/admin/products`);
};
