import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";

export interface StatusProductResponse {
  statusProducts: {
    id: string;
    statusName: string;
  }[];
}

class StatusProduct extends BaseApi {
  async getAll() {
    return (await this.get<StatusProductResponse>(authAxios, `/StatusProduct/all`)).data;
  }
}

export default new StatusProduct();
