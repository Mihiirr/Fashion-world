import React from "react";
import Layout from "~/components/Layout";

type Props = {};

const Cart = (props: Props) => {
  return (
    <Layout>
      <div className="mt-20 max-w-7xl mx-auto">
        <p className="text-3xl">Shopping Cart</p>
        <p>Your shopping bag is empty</p>
      </div>
    </Layout>
  );
};

export default Cart;
