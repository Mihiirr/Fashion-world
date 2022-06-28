import { LoaderFunction } from "@remix-run/node";
import { Link, useCatch } from "@remix-run/react";
import { removeFromCart } from "~/services/queries/cart.server";

export const loader: LoaderFunction = async ({ params }) => {
  const cartId = await params.cartid;
  if (!cartId) {
    throw new Response("Cart not founr", {
      status: 404,
    });
  }
  return removeFromCart(cartId);
};

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = <p>Product Not Found!!!</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
      <p className="text-5xl mb-6">
        {caught.status} {caught.statusText}!
      </p>
      <Link
        to="/admin/products"
        className="h-10 w-36 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
      >
        BACK
      </Link>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
      <p className="text-5xl mb-6">App Error!</p>
      <p className="text-xl mb-4">
        Oops Something went wrong, Please try again letter
      </p>
      <pre>{error.message}</pre>
      <Link
        to="/"
        className="h-10 w-36 mt-6 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
      >
        Home Page
      </Link>
    </div>
  );
}
