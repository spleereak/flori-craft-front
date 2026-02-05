import { RequestOptions } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function buildUrl(url: string, params?: RequestOptions["params"]) {
  if (!params) return url;

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.append(key, String(value));
  });

  return `${url}?${query.toString()}`;
}

async function apiClient<TResponse, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    params,
    headers,
    cache,
    next,
    revalidate,
  } = options;

  // Для GET запросов по умолчанию кэшируем на 60 секунд
  const fetchCache = cache ?? (method === "GET" ? undefined : "no-store");
  const fetchNext =
    next ?? (method === "GET" && !cache ? { revalidate: revalidate ?? 60 } : undefined);

  const fullUrl = buildUrl(`${BASE_URL}${url}`, params);

  const res = await fetch(fullUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache: fetchCache,
    next: fetchNext,
  });

  if (!res.ok) {
    switch (res.status) {
      case 401:
        if (typeof window !== "undefined") {
          window.location.href = "/auth";
        }
        break;
    }
    throw new Error(`HTTP error: ${res.status}`);
  }

  return res.json() as Promise<TResponse>;
}

export default apiClient;
