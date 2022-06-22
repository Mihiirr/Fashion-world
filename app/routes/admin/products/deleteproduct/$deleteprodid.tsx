import { LoaderFunction, redirect } from "@remix-run/node";
import { useLocation } from "@remix-run/react";
import { deleteFileLocally } from "~/services/queries/imgupload.server";
import {
  deleteAProduct,
  getUniqueProducts,
} from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ params }) => {
  const id = await params.deleteprodid;
  if (typeof id !== "string") return redirect(`/admin/products`);
  const productDetails = await getUniqueProducts(id);
  if (!productDetails) {
    throw new Response("What a product! Not found.", {
      status: 404,
    });
  }
  await deleteFileLocally(productDetails.image);
  return deleteAProduct(id);
};
