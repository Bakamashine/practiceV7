import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";
import type { UserDto } from "./feedback";
import type IPaginate from "~/interface/IPaginate";
import type IBaseValidation from "~/interface/IBaseValidation";

export interface UserManagementCreate {
  Fullname: string;
  PhoneNumber: string;
  Password: string;
  RoleId: string;
}

export interface UserManagementUpdate {
  Id: string;
  Fullname: string;
  PhoneNumber: string;
  RoleId: string;
  IsActive: boolean;
  Avatar?: File;
}

export interface UserDtoWithPagination extends IPaginate {
  items: UserDto[];
}

export interface RoleDto {
  id: string;
  name: string;
}

export interface UserManagementValidation extends IBaseValidation {
  errors: {
    Fullname?: string[];
    PhoneNumber?: string[];
    Password?: string[];
    RoleId?: string[];
  };
}

class UserManagement extends BaseApi {
  async getAllWithPaginate(page: string|number) {
    const params = new URLSearchParams({
      pageSize: "6",
      page: String(page),
    });
    const result = await this.get<UserDtoWithPagination>(authAxios, `user/pag/all?${params}`);
    console.log("Getall user: ", result)
    return result.data;
  }

  async getAllRoles() {
    const result = await this.get<{ roles: RoleDto[] }>(authAxios, "role/all");
    return result.data;
  }

  async create(user: UserManagementCreate) {
    const formData = new FormData();
    formData.append("Fullname", user.Fullname);
    formData.append("PhoneNumber", user.PhoneNumber);
    formData.append("Password", user.Password);
    formData.append("RoleId", user.RoleId);
    const result = await this.post<UserDto>(authAxios, "user", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return result;
  }

  async update(user: UserManagementUpdate) {
    const formData = new FormData();
    formData.append("Id", user.Id);
    formData.append("Fullname", user.Fullname);
    formData.append("PhoneNumber", user.PhoneNumber);
    formData.append("RoleId", user.RoleId);
    formData.append("IsActive", String(user.IsActive));
    if (user.Avatar) {
      formData.append("Avatar", user.Avatar);
    }
    console.log("Update user payload:", Object.fromEntries(formData));
    const result = await this.put<UserDto>(authAxios, `user/admin`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Update user result:", result);
    return result;
  }

  async deleteUser(id: string) {
    const result = await this.delete<UserDto>(authAxios, `user/${id}`);
    return result;
  }
}

export default new UserManagement();
