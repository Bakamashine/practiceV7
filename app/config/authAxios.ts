import axios, { AxiosError } from "axios";
import backend_url from "./url";

const isBrowser = typeof window !== "undefined";

const authAxios = axios.create({
  baseURL: backend_url,
  validateStatus: (status) => status < 500,
});

authAxios.interceptors.request.use(
  (config) => {
    if (isBrowser) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.authToken) {
            config.headers.Authorization = `Bearer ${user.authToken}`;
          }
        } catch {
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (isBrowser && error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default authAxios;