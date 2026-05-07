import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";
import type { UserData } from "./auth";
// import { userInfo } from "os";

class User extends BaseApi {
  async getFullInfo() {
    const result = await this.get<UserData>(authAxios, "Auth/me/all");
    console.log("GetFull user info: ", result.data);
    return result;
  }
}

export default new User();
