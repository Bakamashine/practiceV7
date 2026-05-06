import axios from "axios";
import backend_url from "../constants/url";

const authAxios = axios.create({
  baseURL: backend_url,
  withCredentials: true,
  validateStatus: (status) => status <= 500,
});

export default authAxios;
