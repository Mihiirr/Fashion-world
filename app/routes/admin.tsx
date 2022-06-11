import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import React from "react";
import AdminLayout from "~/components/Admin/AdminLayout";
import { getUser } from "~/services/session.server";

type Props = {};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (user?.role === "USER") return redirect("/", 301);
  return null;
};

const Admin: React.FC<Props> = (props) => {
  return (
    <AdminLayout>
      <div className="bg-stone-50">
        <Outlet />
      </div>
    </AdminLayout>
  );
};

export default Admin;

export const meta: MetaFunction = () => {
  return {
    title: "Admin Panel",
    description: `Wellcome to the admin panel of Fashion World`,
  };
};
