import { LoaderFunction, redirect } from "@remix-run/node";
import { addToFeatured } from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ params }) => {
  const id = await params.afprodid;
  if (typeof id !== "string") return redirect(`/admin/products`);
  return addToFeatured(id);
};
