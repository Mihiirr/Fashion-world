import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getUniqueProducts } from "~/services/queries/product.server";
import Button from "~/components/Button";

type Props = {};

export const loader: LoaderFunction = async ({ params }) => {
  const productID = params.productid;
  const product = getUniqueProducts(productID!);
  if (product === null) return null;
  return product;
};

const Productdetails = (props: Props) => {
  const product = useLoaderData();
  return (
    <div className="bg-stone-50">
      {product === null ? (
        <div className="h-screen max-w-7xl mx-auto flex items-center justify-center">
          <div>
            <p className="text-5xl">Oops</p>
            <p className="text-3xl mt-8">Product Not Found!!!</p>
            <Link to="/">
              <Button>Home Page</Button>
            </Link>
          </div>
        </div>
      ) : (
        <Layout>
          <div className="mt-10 max-w-7xl mx-auto flex">
            <Link to="/">
              <Button>Back to Products</Button>
            </Link>
          </div>
          <div className="mt-10 max-w-7xl mx-auto flex">
            <img src={product.image} height="600" width="400" />
            <div className="text-3xl ml-10">
              <p>{product.name}</p>
              <p>Rs. {product.price}</p>
              <p className="mb-4">peace white</p>
              {product.isNew && <p className="text-sm mb-4">"New Arrival"</p>}
              <Button variant="secondary">Add to cart</Button>
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
