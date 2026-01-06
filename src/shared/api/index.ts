import apiClient from "./api-client";

export { apiClient };

export const api = {
  get: <T = any>(url: string, config?: any) => apiClient.get<T, T>(url, config),
  post: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.post<T, T>(url, data, config),
};
