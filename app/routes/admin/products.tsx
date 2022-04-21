import React from "react";
import ItemContainer from "~/components/ItemContainer";

type Props = {};

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

const Products: React.FC<Props> = (props) => {
  return (
    <div>
      {/* Featured Items */}
      <ItemContainer
        title="Dresses"
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
    </div>
  );
};

export default Products;
