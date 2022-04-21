import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
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
import React, { Children } from "react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Josefin+Slab:wght@500&display=swap",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const data = {
    user,
  };
  return json(data);
};

function Document({
  children,
  title = "Fashion World",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
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
