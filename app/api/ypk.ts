import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";
import guestAxios from "~/config/guestAxios";

export interface OneYpkResponse {
  id: string;
  ypkName: string;
  description: string;
  isActive: boolean;
}
export interface YpkResponse {
  ypks: OneYpkResponse[];
}

class Ypk extends BaseApi {
  async getAll() {
    return (await this.get<YpkResponse>(guestAxios, "Ypk/all")).data;
  }
}

export default new Ypk();
