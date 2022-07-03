import { Product } from "@prisma/client";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import Button from "~/components/Button";
import EditIcon from "~/components/Icons/EditIcon";
import { getUniqueProducts } from "~/services/queries/product.server";

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
  const productID = params.prodid;
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

const AdminProductDetail = () => {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <div className="mt-10 max-w-7xl mx-auto flex">
        <Link to="/admin/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
      <div className="mt-10 max-w-7xl mx-auto flex">
        <img src={`/uploads/${data.product.image}`} height="600" width="400" />
        <form method="post" className="text-2xl ml-10">
          <div className="flex items-center">
            <p>{data.product.name}</p>
            <div className="h-6 w-6 ml-2 bg-stone-200 flex items-center justify-center rounded-md hover:bg-stone-300 active:bg-stone-400">
              <EditIcon />
            </div>
          </div>
          <div className="flex items-center">
            <p>Rs. {data.product.price}</p>
            <div className="h-6 w-6 ml-2 bg-stone-200 flex items-center justify-center rounded-md hover:bg-stone-300 active:bg-stone-400">
              <EditIcon />
            </div>
          </div>
          <div className="flex items-center">
            <p>peace white</p>
            <div className="h-6 w-6 ml-2 bg-stone-200 flex items-center justify-center rounded-md hover:bg-stone-300 active:bg-stone-400">
              <EditIcon />
            </div>
          </div>
          <div className="flex items-center h-auto w-20">
            <label htmlFor="isnew-input" className="text-2xl">
              IsNew
            </label>
            <input
              id="isnew-input"
              name="isnew"
              type="checkbox"
              className="ml-2"
              checked={data.product.isNew}
            />
          </div>
          <div className="flex items-center h-auto w-20">
            <label htmlFor="isfeatured-input" className="text-2xl">
              IsFeatured
            </label>
            <input
              id="isfeatured-input"
              name="isfeatured"
              type="checkbox"
              className="ml-2"
              checked={data.product.isFeatured}
            />
          </div>
          <Button variant="secondary" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductDetail;

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
