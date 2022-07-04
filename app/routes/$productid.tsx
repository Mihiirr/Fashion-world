import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import Layout from "~/components/Layout";
import { getUniqueProducts } from "~/services/queries/product.server";
import Button from "~/components/Button";
import type { Product } from "@prisma/client";
import { getUserId } from "~/services/session.server";
import { addToCart } from "~/services/queries/cart.server";

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No product",
      description: "No product found",
    };
  }
  return {
    title: `${data.product.name}`,
    description: `Enjoy the "${data.product.name}" joke and much more`,
  };
};

type LoaderData = { product: Product };

export const loader: LoaderFunction = async ({ params }) => {
  const productID = params.productid;
  const product = await getUniqueProducts(productID!);
  if (!product) {
    throw new Response("What a product! Not found.", {
      status: 404,
    });
  }
  const data: LoaderData = {
    product,
  };
  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const productID = params.productid;
  const userId = await getUserId(request);
  if (!productID) {
    throw new Response("What a product! Not found.", {
      status: 404,
    });
  }
  if (!userId) {
    throw new Response("User Not found.", {
      status: 404,
    });
  }
  return addToCart(userId, productID);
};

const Productdetails = () => {
  const data = useLoaderData<LoaderData>();
  return (
    <Layout>
      <div className="flex flex-col items-center bg-stone-200">
        <div className="h-full lg:h-4/5 w-full flex justify-center">
          <img
            src={`/uploads/${data.product.image}`}
            className="h-[1200px] w-[800px] lg:h-[600px] lg:w-[400px]"
          />
          {data.product.isNew && (
            <div className="absolute h-5 flex items-center justify-end text-3xl lg:text-sm">
              New Arrival
            </div>
          )}
        </div>
        <div className="h-full w-full lg:w-4/5 bg-white p-10 flex flex-col items-center rounded-t-[70px] lg:rounded-t-3xl">
          <div className="w-full lg:w-2/5 lg:text-3xl text-6xl">
            <div className="flex w-full justify-between">
              <p>{data.product.name}</p>
              <p>Rs. {data.product.price}</p>
            </div>
            <p className="text-3xl lg:text-xl text-gray-500 mb-5">
              peace white
            </p>

            {data.product.category === "dress" && (
              <div>
                <div>Size</div>
                <div className="mb-5 flex">
                  <div className="h-12 w-12 lg:h-8 lg:w-8 mr-2 rounded-full bg-black text-white flex items-center justify-center lg:text-lg text-2xl">
                    S
                  </div>
                  <div className="h-12 w-12 lg:h-8 lg:w-8 mr-2 rounded-full bg-black text-white flex items-center justify-center lg:text-lg text-2xl">
                    M
                  </div>
                  <div className="h-12 w-12 lg:h-8 lg:w-8 rounded-full bg-black text-white flex items-center justify-center lg:text-lg text-2xl">
                    XL
                  </div>
                </div>
              </div>
            )}
            <form method="post">
              <Button type="submit" variant="secondary">
                Add to cart
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetails;

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
          <p className="text-5xl mb-6">
            What you're trying to do is not allowed.
          </p>
          <Link
            to="/"
            className="h-10 w-36 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
          >
            Home Page
          </Link>
        </div>
      );
    }
    case 404: {
      return (
        <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
          <p className="text-5xl mb-6">
            Product Not Found with id: {params.productid}?
          </p>
          <Link
            to="/"
            className="h-10 w-36 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
          >
            Home Page
          </Link>
        </div>
      );
    }
    case 401: {
      return (
        <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
          <p className="text-5xl mb-6">
            Sorry, but {params.productid} is not your product.
          </p>
          <Link
            to="/"
            className="h-10 w-36 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
          >
            Home Page
          </Link>
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  const { productid } = useParams();
  return (
    <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
      <p className="text-5xl mb-6">
        There was an error loading product by the id ${productid}. Sorry.
      </p>
      <Link
        to="/"
        className="h-10 w-36 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
      >
        Home Page
      </Link>
    </div>
  );
}
