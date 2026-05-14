import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";

class Like extends BaseApi {
    async create(idProduct: string) {
        throw new Error("Method is not allowed")
        const result = await this.post(authAxios, "")
    }
}

export default new Like