import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import StaticsCard from "~/components/Admin/dashboard/StaticsCard";
import {
  StocksInTotal,
  netAmountOfTotalStocks,
  totalVarietyProducts,
} from "~/services/queries/product.server";
import { totalUserCount, totalUserGroupBy } from "~/services/session.server";

type LoaderData = {
  totalStocks: number;
  totalVarietyProduct: number;
  totalUsers: number;
  usersGroupBy: Array<{ role: string; _count: { id: number } }>;
  netAmountOfTotalStock: number;
};

export const loader: LoaderFunction = async ({ request }) => {
  const totalStocks = await StocksInTotal();
  const totalVarietyProduct = await totalVarietyProducts();
  const totalUsers = await totalUserCount();
  const usersGroupBy = await totalUserGroupBy();
  const netAmountOfTotalStock = await netAmountOfTotalStocks();

  const data: LoaderData = {
    totalStocks,
    totalVarietyProduct,
    totalUsers,
    usersGroupBy,
    netAmountOfTotalStock,
  };
  return json(data);
};

const Dashboard = () => {
  const data = useLoaderData<LoaderData>();
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
          amount={`${data.totalUsers}`}
          description={`${
            data.usersGroupBy[0] ? data.usersGroupBy[0]._count.id : "0"
          }-ADMIN, ${
            data.usersGroupBy[1] ? data.usersGroupBy[1]._count.id : `0`
          }-USER `}
        />
        <StaticsCard
          title="Total Products"
          amount={`${data.totalStocks}`}
          description={`Net amount ₹${data.netAmountOfTotalStock}`}
        />
        <StaticsCard
          title="Total Variety"
          amount={`${data.totalVarietyProduct}`}
          description="10 total sales"
        />
        <StaticsCard
          title="Total Sale"
          amount="₹2000"
          description="10 total sales"
        />
        <StaticsCard
          title="Total Sale"
          amount="₹2000"
          description="10 total sales"
        />
      </div>
    </div>
  );
};

export default Dashboard;
