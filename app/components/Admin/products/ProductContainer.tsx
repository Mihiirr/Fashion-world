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
    category: string;
    price: string;
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
        {props.product.map((items) => (
          <div className="mr-16 mb-8" key={items.id}>
            <Link to={`/admin/${items.id}`}>
              <img
                src={items.image}
                height={props.height}
                width={props.width}
                alt="items"
                className="hover:cursor-pointer mb-2"
              />
              <p>{items.name}</p>
              <p>{items.price}</p>
            </Link>
            <Link to={`/admin/products/deleteproduct/${items.id}`}>
              <button type="button" className="border-2 border-black mb-2">
                Delete Product
              </button>
            </Link>
            {items.isFeatured === true ? (
              <Link to={`/admin/products/removefeature/${items.id}`}>
                <Button>Remove Feature</Button>
              </Link>
            ) : (
              <Link to={`/admin/products/addfeature/${items.id}`}>
                <Button>Add to Feature</Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
