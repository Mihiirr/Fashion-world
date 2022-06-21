import React, { useState } from "react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import ProductContainer from "~/components/Admin/products/ProductContainer";
import Button from "~/components/Button";
import {
  addAProduct,
  getUniqueCategoryProducts,
} from "~/services/queries/product.server";
import ImageUploader from "~/components/ImageUploader";
import { imageUpload } from "~/services/queries/imgupload.server";
import ImageUploading, { ImageListType } from "react-images-uploading";

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

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const category = form.get("category");
  const price = form.get("price");
  const image = form.get("image");
  const inStock = form.get("instock");
  const isNew = form.get("isnew") === "on" ? true : false;
  const isFeatured = form.get("isfeatured") === "on" ? true : false;

  console.log({ image });

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
    "/dress4.jpg",
    parseInt(price),
    parseInt(inStock),
    isNew,
    isFeatured
  );
};

const Products: React.FC<Props> = (props) => {
  const data = useLoaderData<LoaderData>();

  const actiondata = useActionData();
  // console.log({ actiondata });

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList);
    await setImages(imageList as never[]);
  };

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
            />
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

{
  /* <ImageUploading value={images} onChange={onChange}>
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button onClick={onImageUpload}>
                    Click here to add image
                  </button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading> */
}
