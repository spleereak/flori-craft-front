import { productsApi } from "@/src/entities/products/api";

import ClientProductPage from "../components/ClientProductPage/ui";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await productsApi.getProductById(id);

  if (!product.title) return <div className="pt-100">Данные не найдены</div>;

  return <ClientProductPage product={product} />;
}
