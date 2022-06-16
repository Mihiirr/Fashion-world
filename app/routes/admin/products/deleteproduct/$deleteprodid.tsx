import { LoaderFunction, redirect } from "@remix-run/node";
import { deleteAProduct } from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ params }) => {
  const id = await params.deleteprodid;
  if (typeof id !== "string") return redirect(`/admin/products`);
  return deleteAProduct(id);
};
