import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import StaticsCard from "~/components/Admin/dashboard/StaticsCard";
import {
  netAmountOfTotalProduct,
  totalProductCount,
} from "~/services/queries/product.server";
import { totalUserCount } from "~/services/session.server";

type Props = {};

export const loader: LoaderFunction = async ({ request }) => {
  const netAmountOfTotalProducts = await netAmountOfTotalProduct();
  const totalProducts = await totalProductCount();
  const totalUsers = await totalUserCount();
  return {
    netAmountOfTotalProducts,
    totalProducts,
    totalUsers,
  };
};

const Dashboard: React.FC<Props> = (props) => {
  const { totalProducts, totalUsers, netAmountOfTotalProducts } =
    useLoaderData();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-20 flex flex-wrap">
        <StaticsCard
          title="Total Sale"
          amount="₹2000"
          description="10 total sales"
        />
        <StaticsCard
          title="Total Orders"
          amount="6"
          description="Not implemented"
        />
        <StaticsCard
          title="Total User"
          amount={totalUsers}
          description="Not implemented"
        />
        <StaticsCard
          title="Total Products"
          amount={totalProducts}
          description={`Net amount ${netAmountOfTotalProducts._sum.price}`}
        />
        <StaticsCard
          title="Total Sale"
          amount="2000"
          description="10 total sales"
        />
        <StaticsCard
          title="Total Sale"
          amount="2000"
          description="10 total sales"
        />
        <StaticsCard
          title="Total Sale"
          amount="2000"
          description="10 total sales"
        />
      </div>
    </div>
  );
};

export default Dashboard;
