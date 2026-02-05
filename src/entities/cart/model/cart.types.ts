import { Bouquet } from "../../products/api";

export type CartItem = Omit<
  Bouquet,
  "description" | "variants" | "price" | "image_urls" | "id"
> & {
  product_id: string;
  size: "S" | "M" | "L";
  price: number;
  image: string;
};
