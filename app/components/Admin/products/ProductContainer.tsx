import { Form, Link } from "@remix-run/react";
import React from "react";
import Button from "~/components/Button";

type Props = {
  title: string;
  height: string;
  width: string;
  product: {
    id: string;
    name: string;
    image: string;
    inStock: number;
    price: number;
    isNew: boolean;
    isFeatured: boolean;
  }[];
};

const ProductContainer: React.FC<Props> = (props) => {
  return (
    <div className="h-auto max-w-7xl mt-20 mx-auto">
      <div className="h-20 w-full flex items-end justify-between">
        <div className="h-2/4 w-4/12 border-t-2"></div>
        <div className="h-full w-4/12 flex items-center justify-center text-3xl">
          {props.title}
        </div>
        <div className="h-2/4 w-4/12 border-t-2"></div>
      </div>
      <div className="flex w-full flex-wrap">
        {props.product.map((item) => (
          <div className="mr-16 mb-8" key={item.id}>
            <Link to={`/admin/${item.id}`}>
              <img
                src={item.image}
                height={props.height}
                width={props.width}
                alt="items"
                className="hover:cursor-pointer mb-2"
              />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </Link>
            <Link to={`/admin/products/deleteproduct/${item.id}`}>
              <Button variant="danger">Remove Product</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
