import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import Layout from "~/components/Layout";

type Props = {};

export const loader: LoaderFunction = async ({ params }) => {
  const Image = await params;
  if (Image) return Image.productdetails;
  return null;
};

const Productdetails = (props: Props) => {
  const Image = useLoaderData();
  return (
    <Layout>
      <div className="mt-20 max-w-7xl mx-auto flex">
        <img src={`/${Image}.jpg`} height="600" width="400" />
        <div className="text-3xl">
          <p>{Image}</p>
          <p>Rs. 799</p>
          <p>peace white</p>
          <Link to="/cart">
            <button className="bg-stone-400 text-white p-2">
              Add to carts
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetails;

export const meta: MetaFunction = () => {
  return {
    title: "product details",
    description: `Wellcome to the admin panel of Fashion World`,
  };
};
