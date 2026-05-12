import axios from "axios";
import backend_url from "../constants/url";
import auth from "~/api/auth";

const authAxios = axios.create({
  baseURL: backend_url,
  withCredentials: true,
  validateStatus: (status) => status <= 500,
});

authAxios.interceptors.response.use(
  function (response) {
    if (response.status == 401) {
      auth.refreshToken();
    }
    return response;
  }
)

export default authAxios;
