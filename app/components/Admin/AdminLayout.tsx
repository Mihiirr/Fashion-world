import { Link } from "@remix-run/react";
import React from "react";
import Logo from "../Logo";

type Props = {
  children: React.ReactNode;
};

const HeaderLinks = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    active: true,
  },
  {
    name: "Orders",
    href: "/admin/orders",
  },
  {
    name: "Products",
    href: "/admin/products",
  },
  {
    name: "Sections",
    href: "/admin/sections",
  },
  {
    name: "Clients",
    href: "/admin/clients",
  },
];

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50 pb-10">
      {/* Header */}
      <div className="h-20 w-full border-b-2 border-gray-200 bg-white flex items-center px-8">
        <Logo size="small" />
        <div
          id="dashboard"
          className="flex ml-12 items-center justify-between text-lg target:bg-blue-300"
        >
          {HeaderLinks.map((item) => (
            <Link
              to={item.href}
              key={item.name}
              className="mr-6 hover:underline hover:cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Children */}
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
