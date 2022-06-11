import React from "react";
import StaticsCard from "~/components/Admin/dashboard/StaticsCard";

type Props = {};

const Dashboard: React.FC<Props> = (props) => {
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
          amount="20"
          description="Not implemented"
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
