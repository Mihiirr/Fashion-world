import React from "react";
import DeliveryContainer from "~/components/Admin/orders/deliveryContainer";

type Props = {};

const pendingOrders = [
  {
    fullName: "Mihir Patel",
    contact: "9737942543",
    orderItems: "pants",
    shippingAddress:
      "Ratnaraj residency near kh-0 circle B/H siddhraj zori, Sargasan, Gandhinagar",
    paymentMethod: "Paytm",
    totalPrice: "699",
  },
  {
    fullName: "Kishan Patel",
    contact: "8866817172",
    orderItems: "T-shirt",
    shippingAddress:
      "	Imperia heights near gh-2 circle B/H antilia, Sargasan, Vadodara",
    paymentMethod: "G-pay",
    totalPrice: "1299",
  },
  {
    fullName: "Ashu Patel",
    contact: "8989337747",
    orderItems: "kurta",
    shippingAddress: "	Imperia heights sector-21 B/H mannat, Sargasan, Mumbai",
    paymentMethod: "G-pay",
    totalPrice: "3000",
  },
];

const Orders: React.FC<Props> = (props) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Pending Delivery */}
      <DeliveryContainer
        title="Pending Delivery"
        pendingDelivery={pendingOrders}
      />
      {/* Delivered */}
      <DeliveryContainer title="Delivered" pendingDelivery={pendingOrders} />
    </div>
  );
};

export default Orders;
