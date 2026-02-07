const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

async function strapiClient<T>(
  endpoint: string,
  options: {
    params?: Record<string, string>;
    revalidate?: number;
  } = {}
): Promise<T | null> {
  const { params, revalidate = 60 } = options;

  let url = `${STRAPI_URL}${endpoint}`;

  if (params) {
    const query = new URLSearchParams(params);
    url += `?${query.toString()}`;
  }

  try {
    const res = await fetch(url, {
      next: { revalidate },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

export const strapiApi = {
  get: <T>(
    endpoint: string,
    options?: { params?: Record<string, string>; revalidate?: number }
  ): Promise<T | null> => strapiClient<T>(endpoint, options),
};
