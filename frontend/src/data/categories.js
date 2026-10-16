import panjabiImg from "../assets/images/category-panjabi.jpg"; 
import tshirtImg from "../assets/images/category-tshirts.jpg"; 
import shirtImg from "../assets/images/category-shirts.jpg"; 
import pantsImg from "../assets/images/category-pants.jpg"; 

export const CATEGORIES = [
  {
    id: "panjabi",
    slug: "panjabi",
    name: "Panjabi",
    subtitle: "Signature Bangladeshi Festive & Daily Heritage",
    description:
      "Bespoke cuts, handcrafted plackets, and breathable luxury fabrics made for modern celebration.",
    image: panjabiImg,
    itemCount: "6 Designs",
    startingPrice: 1850,
  },
  {
    id: "t-shirts",
    slug: "t-shirts",
    name: "T-Shirts",
    subtitle: "Heavyweight Minimalist Combed Cotton",
    description:
      "240+ GSM structured cotton engineered for daily silhouette retention and tropical comfort.",
    image: tshirtImg,
    itemCount: "5 Designs",
    startingPrice: 750,
  },
  {
    id: "shirts",
    slug: "shirts",
    name: "Shirts",
    subtitle: "Tailored Linen & Crisp Formal Poplin",
    description:
      "Mandarin collars, French plackets, and washed linen blends crafted for desk-to-dinner style.",
    image: shirtImg,
    itemCount: "5 Designs",
    startingPrice: 1350,
  },
  {
    id: "pants",
    slug: "pants",
    name: "Pants",
    subtitle: "Precision Tailored Chinos & Pleated Trousers",
    description:
      "Smart stretch fabric, comfort waistbands, and clean tapered hems engineered for versatility.",
    image: pantsImg,
    itemCount: "4 Designs",
    startingPrice: 1750,
  },
];