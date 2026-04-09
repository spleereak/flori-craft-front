import { NextResponse } from "next/server";

import { categoryApi } from "@/src/entities/category/api";
import { productsApi } from "@/src/entities/products/api";

const SYNC_SECRET_HEADER = "x-sync-secret";

const isSyncAuthorized = (request: Request) => {
  const expectedSecret = process.env.CATEGORY_SYNC_SECRET;

  if (!expectedSecret) {
    return true;
  }

  return request.headers.get(SYNC_SECRET_HEADER) === expectedSecret;
};

export async function POST(request: Request) {
  if (!isSyncAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const specificationsResponse = await productsApi.getCategories();

    const categories = specificationsResponse.categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description ?? "",
    }));

    const result = await categoryApi.syncCategories(categories);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Categories sync failed";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
