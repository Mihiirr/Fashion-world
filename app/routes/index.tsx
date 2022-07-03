import { json, LoaderFunction } from "@remix-run/node";
import ItemContainer from "~/components/ItemContainer";
import Layout from "~/components/Layout";
import { useLoaderData } from "@remix-run/react";
import { getUniqueCategoryFeaturedProducts } from "~/services/queries/product.server";

type LoaderData = {
  FeaturedDressProducts: Array<{ id: string; image: string; isNew: boolean }>;
  FeaturedJewelleryProducts: Array<{
    id: string;
    image: string;
    isNew: boolean;
  }>;
};

export const loader: LoaderFunction = async () => {
  const FeaturedDressProducts = await getUniqueCategoryFeaturedProducts(
    "dress"
  );
  const FeaturedJewelleryProducts = await getUniqueCategoryFeaturedProducts(
    "jewellery"
  );

  const data: LoaderData = {
    FeaturedDressProducts,
    FeaturedJewelleryProducts,
  };
  return json(data);
};

export default function Index() {
  const { FeaturedDressProducts, FeaturedJewelleryProducts } =
    useLoaderData<LoaderData>();
  return (
    <Layout>
      {/* Corousel */}
      <div className="max-w-7xl mx-auto h-96 mt-20 bg-stone-300">
        <img
          src="/corousel_watch.webp"
          height="384"
          width="1280"
          alt="corousel"
        />
      </div>

      {/* Featured Items */}
      <ItemContainer
        title="Featured Items"
        height="379"
        width="252"
        product={FeaturedDressProducts}
      />

      {/* Jwellery Set */}
      <ItemContainer
        title="Jewellery Set"
        height="256"
        width="256"
        product={FeaturedJewelleryProducts}
      />
    </Layout>
  );
}
