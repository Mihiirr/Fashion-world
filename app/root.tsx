import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import styles from "./styles/app.css";
import { getUser } from "./services/session.server";
import { RootContextProvider } from "./context/RootContext";
import React from "react";
import { getCartItems } from "./services/queries/cart.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  cart: Awaited<ReturnType<typeof getCartItems>>;
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,500&family=Smooch&display=swap",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const cart = await getCartItems(user?.id!);
  const data: LoaderData = {
    user,
    cart,
  };
  return json(data);
};

export const meta: MetaFunction = () => {
  const description = `Welcome to Fshion World!`;
  return {
    charset: "utf-8",
    description,
    keywords: "Fashion,World, Shopping",
    "twitter:image": "https://remix-jokes.lol/social.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@remix_run",
    "twitter:site": "@remix_run",
    "twitter:title": "Fashion & World",
    "twitter:description": description,
  };
};

function Document({
  children,
  title = "Fashion & World",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const loaderData = useLoaderData();
  const rootContextData = {
    user: loaderData.user,
    cart: loaderData.cart,
    isAuthModalOpen: false,
  };
  return (
    <RootContextProvider initState={rootContextData}>
      <Document>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </Document>
    </RootContextProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
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
    </Document>
  );
}

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
      message = <p>Please check the URL in the address bar and try again.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="h-screen flex flex-col items-center justify-center p-20 bg-stone-50">
        <p className="text-5xl mb-6">
          {caught.status} {caught.statusText}!
        </p>
        <Link
          to="/"
          className="h-10 w-36 flex items-center justify-center text-lg border-2 border-gray-200 hover:bg-stone-100"
        >
          Home Page
        </Link>
      </div>
    </Document>
  );
}
