import { Bouquet } from "../../products/api";

export type CartItem = Omit<Bouquet, "description" | "variants" | "price"> & {
  productId: string;
  size: "S" | "M" | "L";
  price: number;
};
