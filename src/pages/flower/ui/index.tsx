import { Suspense } from "react";

import { productsApi } from "@/src/entities/products/api";

import ClientProductPage from "../components/ClientProductPage/ui";

function ProductSkeleton() {
  return (
    <div className="desktop:flex-row desktop:gap-184 desktop:flex desktop:items-start w-full animate-pulse">
      <div className="desktop:max-w-1054 desktop:flex-row desktop:gap-24 relative flex w-full flex-col">
        <div className="desktop:size-539 desktop:rounded-2xl h-440 w-full rounded-md bg-gray-200" />
        <div className="desktop:pt-50 desktop:max-w-491 desktop:px-0 flex flex-col gap-4 px-16 pt-12">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-6 w-1/2 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const bouquets = await productsApi.getAllBouquets();
  return bouquets.slice(0, 20).map(bouquet => ({
    id: bouquet.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await productsApi.getProductById(id);

  if (!product.title) return <div className="pt-100">Данные не найдены</div>;

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ClientProductPage product={product} />
    </Suspense>
  );
}
