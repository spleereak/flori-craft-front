import { strapiApi } from "@/src/shared/api";

const SYNC_SECRET_HEADER = "x-sync-secret";

export interface EditableCategory {
  id: string;
  name: string;
  description: string;
  position: number;
}

export interface SyncableCategory {
  id: string;
  name: string;
  description?: string;
}

interface EditableCategoriesResponse {
  data: EditableCategory[];
}

interface SyncCategoriesResponse {
  data: {
    totalReceived: number;
    processed: number;
    created: number;
    updated: number;
    skipped: number;
  };
}

const getSyncHeaders = (): Record<string, string> => {
  const syncSecret = process.env.CATEGORY_SYNC_SECRET;

  return syncSecret
    ? {
        [SYNC_SECRET_HEADER]: syncSecret,
      }
    : {};
};

export const categoryApi = {
  async getEditableCategories(): Promise<EditableCategory[]> {
    const response = await strapiApi.get<EditableCategoriesResponse>(
      "/categories/catalog",
      {
        revalidate: 60,
      }
    );

    return response?.data ?? [];
  },

  async syncCategories(
    categories: SyncableCategory[]
  ): Promise<SyncCategoriesResponse["data"]> {
    const response = await strapiApi.post<
      SyncCategoriesResponse,
      { categories: SyncableCategory[] }
    >(
      "/categories/sync",
      { categories },
      {
        headers: getSyncHeaders(),
      }
    );

    if (!response) {
      throw new Error("Strapi categories sync failed");
    }

    return response.data;
  },
};
