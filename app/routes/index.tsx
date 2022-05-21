import { LoaderFunction, MetaFunction } from "@remix-run/node";
import ItemContainer from "~/components/ItemContainer";
import Layout from "~/components/Layout";
import { useLoaderData } from "@remix-run/react";
import {
  getAllFeaturedDressProduct,
  getAllFeaturedJewelleryProduct,
} from "../../prisma/seed-data";
import { getAllFeaturedProduct } from "~/services/queries/product.server";

export const loader: LoaderFunction = async ({ request }) => {
  const FeaturedDressProducts = await getAllFeaturedProduct();
  const FeaturedJewelleryProducts = await getAllFeaturedJewelleryProduct();
  return {
    FeaturedDressProducts: FeaturedDressProducts,
    FeaturedJewelleryProducts: FeaturedJewelleryProducts,
  };
};

export default function Index() {
  const { FeaturedDressProducts, FeaturedJewelleryProducts } = useLoaderData();
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
