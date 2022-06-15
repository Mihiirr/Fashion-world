import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import StaticsCard from "~/components/Admin/dashboard/StaticsCard";
import {
  StocksInTotal,
  netAmountOfTotalStocks,
  totalVarietyProducts,
} from "~/services/queries/product.server";
import { totalUserCount, totalUserGroupBy } from "~/services/session.server";

type Props = {};

export const loader: LoaderFunction = async ({ request }) => {
  const totalStocks = await StocksInTotal();
  const totalVarietyProduct = await totalVarietyProducts();
  const totalUsers = await totalUserCount();
  const usersGroupBy = await totalUserGroupBy();
  const netAmountOfTotalStock = await netAmountOfTotalStocks();
  return {
    totalStocks,
    totalVarietyProduct,
    totalUsers,
    usersGroupBy,
    netAmountOfTotalStock,
  };
};

const Dashboard: React.FC<Props> = (props) => {
  const {
    totalVarietyProduct,
    totalUsers,
    totalStocks,
    usersGroupBy,
    netAmountOfTotalStock,
  } = useLoaderData();
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
          description={`3-Pending, 3-Delivered`}
        />
        <StaticsCard
          title="Total User"
          amount={totalUsers}
          description={`${
            usersGroupBy[0] ? usersGroupBy[0]._count.id : "0"
          }-ADMIN, ${usersGroupBy[1] ? usersGroupBy[1]._count.id : `0`}-USER `}
        />
        <StaticsCard
          title="Total Products"
          amount={totalStocks}
          description={`Net amount ₹${netAmountOfTotalStock}`}
        />
        <StaticsCard
          title="Total Variety"
          amount={totalVarietyProduct}
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
