import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./styles/app.css";
import { getUser } from "./services/session.server";
import { RootContextProvider } from "./context/RootContext";

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

export default function App() {
  const loaderData = useLoaderData();
  const rootContextData = {
    user: loaderData.user,
    isAuthModalOpen: false,
  };
  return (
    <RootContextProvider initState={rootContextData}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </RootContextProvider>
  );
}
