import React from "react";

type Props = {
  pendingDelivery: {
    fullName: string;
    contact: string;
    orderItems: string;
    shippingAddress: string;
    paymentMethod: string;
    totalPrice: string;
  }[];
  title: string;
};

const DeliveryContainer = (props: Props) => {
  return (
    <div className="bg-white p-4 mt-20 first:mt-20">
      <p className="text-3xl">{props.title}</p>
      <table className="w-full mt-6">
        <tbody className="text-left">
          <tr className="h-16">
            <th className="pl-2">Full Name</th>
            <th>Contact</th>
            <th>Order Items</th>
            <th>Shipping Address</th>
            <th>Payment Method</th>
            <th>Total Price</th>
          </tr>
          {props.pendingDelivery.map((item) => (
            <tr key={item.fullName} className="h-16 even:bg-stone-100">
              <td className="pl-2">{item.fullName}</td>
              <td>{item.contact}</td>
              <td>{item.orderItems}</td>
              <td>{item.shippingAddress}</td>
              <td>{item.paymentMethod}</td>
              <td>₹{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryContainer;
