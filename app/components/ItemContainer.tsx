import { Link } from "@remix-run/react";
import React from "react";

type Props = {
  title: string;
  height: string;
  width: string;
  images: {
    name: string;
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
        {props.images.map((items) => (
          <Link to={items.name.substring(0, 7)} key={items.name}>
            <img
              src={items.name}
              height={props.height}
              width={props.width}
              alt="items"
              className="hover:cursor-pointer"
            />
          </Link>
        ))}
      </div>
      <div className="mt-10 flex w-full items-center justify-center">
        <div className="h-10 w-32 border-2 border-gray-300 rounded-sm flex items-center justify-center text-xl hover:cursor-pointer hover:bg-stone-100 active:bg-stone-200">
          <Link to="/">See more</Link>
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
