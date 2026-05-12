import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";
import type { UserData } from "./auth";
import type IBaseValidation from "~/interface/IBaseValidation";

export interface UserUpdate {
  Fullname: string;
  PhoneNumber: string;
  UserInfo: string;
  Avatar?: File;
}

export interface UserUpdateValidate extends IBaseValidation {
  errors: {
    Fullname?: string[];
    PhoneNumber?: string[];
  };
}

class User extends BaseApi {
  async getFullInfo() {
    const result = await this.get<UserData>(authAxios, "Auth/me/all");
    console.log("GetFull user info: ", result.data);
    return result;
  }

  async updateUserInfo(user: UserUpdate) {
    const formData = new FormData();
    formData.append("Fullname", user.Fullname);
    formData.append("PhoneNumber", user.PhoneNumber);
    formData.append("UserInfo", user.UserInfo);
    if (user.Avatar) {
      formData.append("Avatar", user.Avatar);
    }

    const result = await this.put(authAxios, "/user/current", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Update user: ", result);
    return result;
  }
}

export default new User();
