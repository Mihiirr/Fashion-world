export function getAllProducts() {
  return [
    {
      id: "1",
      name: "Dress1",
      category: "dress",
      image: "/dress1.jpg",
      price: "799",
      inStock: "10",
      isNew: false,
    },
    {
      id: "2",
      name: "Dress2",
      category: "dress",
      image: "/dress2.jpg",
      price: "700",
      inStock: "19",
      isNew: true,
    },
    {
      id: "3",
      name: "Dress3",
      category: "dress",
      image: "/dress3.jpg",
      price: "999",
      inStock: "7",
      isNew: false,
    },
    {
      id: "4",
      name: "Dress4",
      category: "dress",
      image: "/dress4.jpg",
      price: "1299",
      inStock: "5",
      isNew: true,
    },
    {
      id: "5",
      name: "Set1",
      category: "jewellery",
      image: "/JWJSET1.webp",
      price: "1800",
      inStock: "10",
      isNew: false,
    },
    {
      id: "6",
      name: "Set2",
      category: "jewellery",
      image: "/JWJSET2.webp",
      price: "900",
      inStock: "19",
      isNew: true,
    },
    {
      id: "7",
      name: "Set3",
      category: "jewellery",
      image: "/JWJSET3.webp",
      price: "700",
      inStock: "7",
      isNew: false,
    },
    {
      id: "8",
      name: "Set4",
      category: "jewellery",
      image: "/JWJSET4.webp",
      price: "1299",
      inStock: "5",
      isNew: true,
    },
  ];
}

export async function getAllDressProduct() {
  const products = await getAllProducts();
  return products.filter((item) => item.category === "dress");
}

export async function getAllJewelleryProduct() {
  const products = await getAllProducts();
  return products.filter((item) => item.category === "jewellery");
}

export async function findUniqueProduct(id: string) {
  const products = await getAllProducts();
  const uniqueProduct = products.find((item) => item.id === id);
  if (!uniqueProduct) return null;
  return uniqueProduct;
}
