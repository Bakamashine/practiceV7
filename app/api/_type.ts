import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";
import type IBaseValidation from "~/interface/IBaseValidation";

export interface TypeValidation extends IBaseValidation {
  errors: {
    ypkName?: string[];
    description?: string[];
  };
}

class Type extends BaseApi {
  async create(ypkName: string) {
    const result = await this.post<string | TypeValidation>(authAxios, "/Ypk", {
      ypkName,
      description: "",
    });
    console.log("Create type: ", result);
    return result;
  }
}

export default new Type 