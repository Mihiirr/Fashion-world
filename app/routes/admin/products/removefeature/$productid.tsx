import { LoaderFunction, redirect } from "@remix-run/node";
import React from "react";
import { removeFromFeatured } from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = await params.productid;
  if (typeof id !== "string") return redirect(`/admin/products`);
  await removeFromFeatured(id);
  return redirect(`/admin/products`);
};
