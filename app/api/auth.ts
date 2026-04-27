import { decodeToken } from "react-jwt";
import guestAxios from "../config/guestAxios";
import BaseApi, { type ApiResponse } from "./base_api";

export interface UserLogin {
  fullName?: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
  accessToken: string;
}

interface DecodedToken {
  aud: string;
  exp: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone": string;
  iat: number;
  nameid: string;
  nbf: number;
  role: string;
  unique_name: string;
}

class Auth extends BaseApi {
  private decodeToUserData(accessToken: string): ApiResponse<UserData> {
    const decodedToken = decodeToken<DecodedToken>(accessToken);

    if (!decodedToken) {
      return { data: null, error: "Invalid token", status: 401 };
    }

    return {
      data: {
        id: decodedToken.nameid,
        name: decodedToken.unique_name,
        phoneNumber: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"],
        role: decodedToken.role,
        accessToken,
      },
      error: null,
      status: 200,
    };
  }

  async register(user: UserLogin): Promise<ApiResponse<UserData>> {
    const result = await this.post<AuthResponse>(guestAxios, "/Auth/register", {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      password: user.password,
    });

    if (result.error) {
      return { data: null, error: result.error, status: result.status };
    }

    return this.decodeToUserData(result.data!.accessToken);
  }

  async login(user: UserLogin): Promise<ApiResponse<UserData>> {
    const result = await this.post<AuthResponse>(guestAxios, "/Auth/login", {
      PhoneNumber: user.phoneNumber,
      Password: user.password,
    });

    if (result.error) {
      return { data: null, error: result.error, status: result.status };
    }

    return this.decodeToUserData(result.data!.accessToken);
  }
}

export default new Auth();