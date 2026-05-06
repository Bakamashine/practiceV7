import { decodeToken } from "react-jwt";
import guestAxios from "../config/guestAxios";
import BaseApi, { type ApiResponse } from "./base_api";
import type { AxiosInstance } from "axios";

export interface UserLogin {
  fullName?: string;
  phoneNumber: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserData extends AuthResponse {
  id: string;
  name: string;
  phoneNumber: string;
  role: string;
}

const phoneKey =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone";

interface DecodedToken {
  aud: string;
  exp: number;
  [phoneKey]: string;
  iat: number;
  nameid: string;
  nbf: number;
  role: string;
  unique_name: string;
}

class Auth extends BaseApi {
  private decodeToUserData(accessToken: string, refreshToken: string): ApiResponse<UserData> {
    const decodedToken = decodeToken<DecodedToken>(accessToken);

    if (!decodedToken) {
      return { data: null, error: "Invalid token", status: 401 };
    }

    return {
      data: {
        id: decodedToken.nameid,
        name: decodedToken.unique_name,
        phoneNumber: decodedToken[phoneKey],
        role: decodedToken.role,
        accessToken,
        refreshToken,
      },
      error: null,
      status: 200,
    };
  }

  async register(user: UserLogin): Promise<ApiResponse<UserData>> {
    const result = await this.post<AuthResponse>(guestAxios, "Auth/register", {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      password: user.password,
    });

    if (result.error) {
      return { data: null, error: result.error, status: result.status };
    }

    return this.decodeToUserData(result.data!.accessToken, result.data!.refreshToken);
  }

  async login(user: UserLogin): Promise<ApiResponse<UserData>> {
    const result = await this.post<AuthResponse>(guestAxios, "Auth/login", {
      PhoneNumber: user.phoneNumber,
      Password: user.password,
    });

    if (result.error) {
      return { data: null, error: result.error, status: result.status };
    }

    return this.decodeToUserData(result.data!.accessToken, result.data!.refreshToken);
  }

  async loginViaToken(axiosInstance: AxiosInstance, cookieHeader: string | null): Promise<ApiResponse<UserData>> {
    const result = await this.post<AuthResponse>(
      axiosInstance,
      "Auth/loginViaToken",
      {},
      cookieHeader ? { headers: { Cookie: cookieHeader } } : undefined
    );

    if (result.error) {
      return { data: null, error: result.error, status: result.status };
    }
    console.log("LoginViaToken: ", result)
    return this.decodeToUserData(result.data!.accessToken, result.data!.refreshToken);
  }
}

export default new Auth();
