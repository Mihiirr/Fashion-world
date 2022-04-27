import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { findUniqueProduct } from "../../prisma/seed-data";
import React from "react";
import Layout from "~/components/Layout";

type Props = {};

export const loader: LoaderFunction = async ({ params }) => {
  const productID = await params;
  const product = findUniqueProduct(productID.productid!);
  if (product === null) return null;
  return product;
};

const Productdetails = (props: Props) => {
  const product = useLoaderData();
  return (
    <div>
      {product === null ? (
        <div className="h-screen max-w-7xl mx-auto flex items-center justify-center">
          <div>
            <p className="text-5xl">Oops</p>
            <p className="text-3xl mt-8">Product Not Found!!!</p>
            <Link to="/">
              <button className="mt-5 p-2 border-2 border-stone-300 hover:bg-stone-100">
                Home Page
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Layout>
          <div className="mt-10 max-w-7xl mx-auto flex">
            <Link to="/">
              <p className="text-2xl border-2 border-stone-200 p-1 hover:bg-stone-100">
                Back to Products
              </p>
            </Link>
          </div>
          <div className="mt-10 max-w-7xl mx-auto flex">
            <img src={product.image} height="600" width="400" />
            <div className="text-3xl ml-10">
              <p>{product.name}</p>
              <p>Rs. {product.price}</p>
              <p>peace white</p>
              {product.isNew && <p className="text-sm">"New Arrival"</p>}
              <button className="w-52 mt-4 bg-stone-400 text-white p-2 text-2xl">
                Add to cart
              </button>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default Productdetails;

export const meta: MetaFunction = () => {
  return {
    title: "product details",
    description: `Wellcome to the admin panel of Fashion World`,
  };
};