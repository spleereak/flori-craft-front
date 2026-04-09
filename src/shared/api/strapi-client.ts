const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

type StrapiHeaders = Record<string, string>;
type StrapiRequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";
type StrapiNextOptions = {
  revalidate?: number | false;
  tags?: string[];
};

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
    method?: "GET" | "POST";
    body?: unknown;
    params?: Record<string, string>;
    headers?: StrapiHeaders;
    cache?: StrapiRequestCache;
    next?: StrapiNextOptions;
    revalidate?: number;
  } = {}
): Promise<T | null> {
  const {
    method = "GET",
    body,
    params,
    headers,
    cache,
    next,
    revalidate = 60,
  } = options;

  let url = `${STRAPI_URL}${endpoint}`;

  if (params) {
    const query = new URLSearchParams(params);
    url += `?${query.toString()}`;
  }

  try {
    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache: cache ?? (method === "GET" ? undefined : "no-store"),
      next: next ?? (method === "GET" ? { revalidate } : undefined),
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
    options?: {
      params?: Record<string, string>;
      headers?: StrapiHeaders;
      revalidate?: number;
    }
  ): Promise<T | null> => strapiClient<T>(endpoint, options),
  post: <T, B = unknown>(
    endpoint: string,
    body?: B,
    options?: {
      params?: Record<string, string>;
      headers?: StrapiHeaders;
      next?: StrapiNextOptions;
      cache?: StrapiRequestCache;
      revalidate?: number;
    }
  ): Promise<T | null> =>
    strapiClient<T>(endpoint, { ...options, body, method: "POST" }),
};
