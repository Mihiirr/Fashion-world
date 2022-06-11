import React from "react";
import ItemContainer from "~/components/ItemContainer";

type Props = {};

const FeaturedImages = [
  {
    id: "1",
    name: "Kurti",
    image: "/dress1.jpg",
    category: "dress",
    price: "800",
    isNew: true,
  },
  {
    id: "2",
    name: "patyala",
    image: "/dress2.jpg",
    category: "dress",
    price: "900",
    isNew: false,
  },
  {
    id: "3",
    name: "Surti",
    image: "/dress3.jpg",
    category: "dress",
    price: "1200",
    isNew: true,
  },
  {
    id: "4",
    name: "Dress",
    image: "/dress4.jpg",
    category: "dress",
    price: "1000",
    isNew: false,
  },
];

const JwellerySetImages = [
  {
    id: "5",
    name: "Ring",
    image: "/JWJSET1.webp",
    category: "jewellery",
    price: "899",
    isNew: true,
  },
  {
    id: "6",
    name: "Ring2",
    image: "/JWJSET2.webp",
    category: "jewellery",
    price: "1299",
    isNew: false,
  },
  {
    id: "7",
    name: "Ring3",
    image: "/JWJSET3.webp",
    category: "jewellery",
    price: "700",
    isNew: true,
  },
  {
    id: "7",
    name: "Ring4",
    image: "/JWJSET4.webp",
    category: "jewellery",
    price: "1500",
    isNew: false,
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
        product={FeaturedImages}
      />
      {/* Jwellery Set */}
      <ItemContainer
        title="Jewellery Set"
        height="256"
        width="256"
        product={JwellerySetImages}
      />
    </div>
  );
};

export default Products;
