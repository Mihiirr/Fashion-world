import { LoaderFunction, redirect } from "@remix-run/node";
import { removeFromFeatured } from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ params }) => {
  const id = await params.productid;
  if (typeof id !== "string") return redirect(`/admin/products`);
  return removeFromFeatured(id);
};
