import axios from "axios";
import backend_url from "../constants/url";

let accessToken: string | undefined;

export const setAccessToken = (_accessToken: string) => (accessToken = _accessToken);

const authAxios = axios.create({
  baseURL: backend_url,
  withCredentials: true,
  validateStatus: (status) => status <= 500,
});

authAxios.interceptors.request.use((request) => {
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

export default authAxios;
