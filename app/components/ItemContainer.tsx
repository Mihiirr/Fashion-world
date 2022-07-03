import { Link } from "@remix-run/react";
import React from "react";
import Button from "./Button";

type Props = {
  title: string;
  height: string;
  width: string;
  product: {
    id: string;
    image: string;
    isNew: boolean;
  }[];
};

const ItemContainer: React.FC<Props> = (props) => {
  return (
    <div className="h-auto max-w-7xl mt-20 mx-auto">
      <div className="h-20 w-full flex items-end justify-between">
        <div className="h-2/4 w-4/12 border-t-2"></div>
        <div className="h-full w-4/12 flex items-center justify-center text-3xl">
          {props.title}
        </div>
        <div className="h-2/4 w-4/12 border-t-2"></div>
      </div>
      <div className="flex w-full justify-between">
        {props.product.map((items) => (
          <Link to={items.id} key={items.id}>
            <img
              src={`/uploads/${items.image}`}
              height={props.height}
              width={props.width}
              alt="items"
              className="hover:cursor-pointer"
            />
          </Link>
        ))}
      </div>
      <div className="mt-10 flex w-full items-center justify-center">
        <div className="w-32">
          <Link to="/">
            <Button>See more</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
