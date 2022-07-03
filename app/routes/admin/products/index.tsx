import React from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import ProductContainer from "~/components/Admin/products/ProductContainer";
import Button from "~/components/Button";
import {
  addAProduct,
  getUniqueCategoryProducts,
} from "~/services/queries/product.server";
import { fileUploadHandler } from "~/services/queries/imgupload.server";

type Props = {};

type LoaderData = {
  dressProducts: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    inStock: number;
    isNew: boolean;
    isFeatured: boolean;
  }>;
  jewelleryProducts: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    inStock: number;
    isNew: boolean;
    isFeatured: boolean;
  }>;
};

export const loader: LoaderFunction = async () => {
  const dressProducts = await getUniqueCategoryProducts("dress");
  const jewelleryProducts = await getUniqueCategoryProducts("jewellery");

  const data: LoaderData = {
    dressProducts,
    jewelleryProducts,
  };
  return json(data);
};

function validateName(name: unknown) {
  if (typeof name !== "string" || name.length <= 0) {
    return `Please enter Name!`;
  }
}

function validatePrice(price: unknown) {
  if (typeof price !== "string" || price.length <= 0) {
    return `Please provide a Price!`;
  }
}
function validateInStocks(inStock: unknown) {
  if (typeof inStock !== "string" || inStock.length <= 0) {
    return `Please tell us how much stocks are available!`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    inStock: string | undefined;
    price: string | undefined;
  };
  fields?: {
    name: string;
    category: string;
    price: string;
    imageData: FormDataEntryValue;
    inStock: string;
    isNew: boolean;
    isFeatured: boolean;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    fileUploadHandler
  );
  const imageData = formData.get("image");
  const name = formData.get("name");
  const category = formData.get("category");
  const price = formData.get("price");
  const inStock = formData.get("instock");
  const isNew = formData.get("isnew") === "on" ? true : false;
  const isFeatured = formData.get("isfeatured") === "on" ? true : false;

  if (
    typeof name !== "string" ||
    typeof category !== "string" ||
    typeof price !== "string" ||
    typeof inStock !== "string"
  ) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }
  if (!imageData) {
    throw new Error("Image must require for the product!");
  }
  const fields = {
    name,
    category,
    price,
    imageData,
    inStock,
    isNew,
    isFeatured,
  };
  const fieldErrors = {
    name: validateName(name),
    price: validatePrice(price),
    inStock: validateInStocks(inStock),
  };
  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  return addAProduct(
    name,
    category,
    imageData,
    parseInt(price),
    parseInt(inStock),
    isNew,
    isFeatured
  );
};

const Products: React.FC<Props> = (props) => {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  console.log(actionData);
  return (
    <div className="flex">
      <div className="h-screen w-1/4 p-4 flex flex-col items-center border-r-2 border-b-2 border-stone-200">
        <p className="text-xl underline">Add a Product</p>
        <Form
          method="post"
          className="py-4 max-w-7xl mx-auto h-auto flex flex-col"
          encType="multipart/form-data"
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
              defaultValue={actionData?.fields?.name}
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
            {actionData?.fieldErrors?.name ? (
              <p className="text-red-500" id="name-error" role="alert">
                {actionData.fieldErrors.name}
              </p>
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="category-input" className="text-xl">
              Choose a Category:
            </label>
            <select id="category-input" name="category">
              <option value="dress">Dress</option>
              <option value="jewellery">Jewellery</option>
            </select>
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
              defaultValue={actionData?.fields?.price}
              aria-invalid={Boolean(actionData?.fieldErrors?.price)}
              aria-errormessage={
                actionData?.fieldErrors?.price ? "price-error" : undefined
              }
            />
            {actionData?.fieldErrors?.price ? (
              <p className="text-red-500" id="price-error" role="alert">
                {actionData.fieldErrors.price}
              </p>
            ) : null}
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
              placeholder="0"
              defaultValue={0}
              aria-invalid={Boolean(actionData?.fieldErrors?.inStock)}
              aria-errormessage={
                actionData?.fieldErrors?.inStock ? "inStock-error" : undefined
              }
            />
            {actionData?.fieldErrors?.inStock ? (
              <p className="text-red-500" id="inStock-error" role="alert">
                {actionData.fieldErrors.inStock}
              </p>
            ) : null}
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

          <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
            <label htmlFor="image-input" className="text-xl">
              Image
            </label>
            <input
              id="image-input"
              name="image"
              type="file"
              accept="image/png, image/jpg, image/webp"
              className="h-10 w-full border-2 px-4"
            />
          </div>
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        </Form>
      </div>

      <div className="w-3/4 flex flex-col items-center">
        {/* Featured Items */}
        <ProductContainer
          title="Dresses"
          height="379"
          width="252"
          product={data.dressProducts}
        />
        {/* Jwellery Set */}
        <ProductContainer
          title="Jewellery Set"
          height="256"
          width="256"
          product={data.jewelleryProducts}
        />
      </div>
    </div>
  );
};

export default Products;
