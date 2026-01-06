import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          window.location.href = "/auth";
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error("Not found");
          break;
        case 500:
          console.error("Server error");
          break;
      }
    }

    return Promise.reject(error); // ✅ ВАЖНО
  }
);

export default apiClient;
