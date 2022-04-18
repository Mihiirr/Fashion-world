import { MetaFunction } from "@remix-run/node";
import ItemContainer from "~/components/ItemContainer";
import Layout from "~/components/Layout";

const FeaturedImages = [
  {
    name: "/dress1.jpg",
  },
  {
    name: "/dress2.jpg",
  },
  {
    name: "/dress3.jpg",
  },
  {
    name: "/dress4.jpg",
  },
];

const JwellerySetImages = [
  {
    name: "/JWJSET1.webp",
  },
  {
    name: "/JWJSET2.webp",
  },
  {
    name: "/JWJSET3.webp",
  },
  {
    name: "/JWJSET4.webp",
  },
];

export default function Index() {
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
        images={FeaturedImages}
      />

      {/* Jwellery Set */}
      <ItemContainer
        title="Jewellery Set"
        height="256"
        width="256"
        images={JwellerySetImages}
      />
    </Layout>
  );
}

export const meta: MetaFunction = () => {
  return {
    title: "Fashion world",
    description: `Best Items ever`,
  };
};
