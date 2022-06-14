import { LoaderFunction } from "@remix-run/node";
import ItemContainer from "~/components/ItemContainer";
import Layout from "~/components/Layout";
import { useLoaderData } from "@remix-run/react";
import {
  getAllDressProduct,
  getAllJewelleryProduct,
} from "../../prisma/seed-data";

export const loader: LoaderFunction = async ({ request }) => {
  const DressProducts = await getAllDressProduct();
  const JewelleryProducts = await getAllJewelleryProduct();
  return {
    DressProducts,
    JewelleryProducts,
  };
};

export default function Index() {
  const { DressProducts, JewelleryProducts } = useLoaderData();
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
        product={DressProducts}
      />

      {/* Jwellery Set */}
      <ItemContainer
        title="Jewellery Set"
        height="256"
        width="256"
        product={JewelleryProducts}
      />
    </Layout>
  );
}
