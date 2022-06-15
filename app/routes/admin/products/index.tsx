import React, { useState } from "react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import ProductContainer from "~/components/Admin/products/ProductContainer";
import Button from "~/components/Button";
import {
  addAProduct,
  getUniqueCategoryProducts,
} from "~/services/queries/product.server";

type Props = {};

export const loader: LoaderFunction = async ({ request }) => {
  const dressProducts = await getUniqueCategoryProducts("dress");
  const jewelleryProducts = await getUniqueCategoryProducts("jewellery");
  return {
    dressProducts,
    jewelleryProducts,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const category = form.get("category");
  //   const image = form.get("image");
  const price = form.get("price");
  const inStock = form.get("instock");
  const isNew = form.get("isnew") === "on" ? true : false;
  const isFeatured = form.get("isfeatured") === "on" ? true : false;

  if (
    typeof name !== "string" ||
    typeof category !== "string" ||
    typeof price !== "string" ||
    typeof inStock !== "string"
  ) {
    return {
      formError: `Form not submitted correctly.`,
    };
  }

  return addAProduct(
    name,
    category,
    "/JWJSET4.webp",
    parseInt(price),
    parseInt(inStock),
    isNew,
    isFeatured
  );
};

const Products: React.FC<Props> = (props) => {
  const [IsFormOpen, SetIsFormOpen] = useState(false);
  const { jewelleryProducts, dressProducts } = useLoaderData();

  const formHandler = () => {
    SetIsFormOpen(!IsFormOpen);
  };

  return (
    <div>
      {/* Add Product */}
      <div className="max-w-7xl mx-auto">
        <Link to="/admin/products">
          <Button onClick={formHandler}>Add a product</Button>
        </Link>
      </div>

      {/* Form */}
      {IsFormOpen && (
        <Form
          method="post"
          className="py-4 max-w-7xl mx-auto h-auto flex flex-col items-center"
          encType="multipart/form-data"
          onSubmit={formHandler}
        >
          <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
            <label htmlFor="name-input" className="text-xl">
              Name
            </label>
            <input
              id="name-input"
              name="name"
              type="text"
              className="h-10 w-full border-2 px-4"
              autoFocus
            />
          </div>
          <label htmlFor="category-input" className="text-xl">
            Choose a Category:
          </label>
          <select id="category-input" name="category">
            <option value="dress">Dress</option>
            <option value="jewellery">Jewellery</option>
          </select>
          <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
            <label htmlFor="image-input" className="text-xl">
              Image
            </label>
            <input
              id="image-input"
              name="image"
              type="file"
              // accept="image/png, image/jpg"
              className="h-10 w-full border-2 px-4"
            />
          </div>

          <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
            <label htmlFor="price-input" className="text-xl">
              Price
            </label>
            <input
              id="price-input"
              name="price"
              type="number"
              className="h-10 w-full border-2 px-4"
            />
          </div>
          <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
            <label htmlFor="instock-input" className="text-xl">
              Instock
            </label>
            <input
              id="instock-input"
              name="instock"
              type="number"
              className="h-10 w-full border-2 px-4"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-center h-auto w-20 mb-6 mr-4">
              <label htmlFor="isnew-input" className="text-lg mr-3">
                IsNew
              </label>
              <input id="isnew-input" name="isnew" type="checkbox" />
            </div>
            <div className="flex items-center justify-center h-auto w-20 mb-6">
              <label htmlFor="isfeatured-input" className="text-lg mr-3">
                IsFeature
              </label>
              <input id="isfeatured-input" name="isfeatured" type="checkbox" />
            </div>
          </div>
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        </Form>
      )}

      {/* Featured Items */}
      <ProductContainer
        title="Dresses"
        height="379"
        width="252"
        product={dressProducts}
      />
      {/* Jwellery Set */}
      <ProductContainer
        title="Jewellery Set"
        height="256"
        width="256"
        product={jewelleryProducts}
      />
    </div>
  );
};

export default Products;
