import apiClient from "./api-client";

export const api = {
  get: <T>(
    url: string,
    options?: Omit<Parameters<typeof apiClient>[1], "method">
  ) => apiClient<T>(url, { ...options, method: "GET" }),
  post: <T, B = unknown>(
    url: string,
    body?: B,
    options?: Omit<Parameters<typeof apiClient>[1], "method" | "body">
  ) => apiClient<T, B>(url, { ...options, body, method: "POST" }),
  delete: <T, B = unknown>(
    url: string,
    body?: B,
    options?: Omit<Parameters<typeof apiClient>[1], "method">
  ) => apiClient<T, B>(url, { ...options, body, method: "DELETE" }),
};
