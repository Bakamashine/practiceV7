import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export interface ApiResponse<T = any> {
  data: T | null;
  error: any[] | string | null;
  status: number;
}

export default class BaseApi {
  private createRequestConfig(
    method: string,
    url: string,
    payload?: object,
    extraConfig?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return {
      method,
      url,
      data: payload,
      validateStatus: (status) => status < 500,
      ...extraConfig,
    };
  }

  protected async request<T = any>(
    axiosInstance: AxiosInstance,
    url: string,
    payload?: object,
    method: AxiosRequestConfig["method"] = "get",
    extraConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const config = this.createRequestConfig(method, url, payload, extraConfig);
      const response: AxiosResponse<T> = await axiosInstance.request<T>(config);

      if (response.status >= 400) {
        return {
          data: null,
          error: response.data as any,
          status: response.status,
        };
      }

      return {
        data: response.data,
        error: null,
        status: response.status,
      };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Unknown error",
        status: 0,
      };
    }
  }

  protected async get<T = any>(
    axiosInstance: AxiosInstance,
    url: string,
    extraConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(axiosInstance, url, undefined, "get", extraConfig);
  }

  protected async post<T = any>(
    axiosInstance: AxiosInstance,
    url: string,
    payload?: object,
    extraConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(axiosInstance, url, payload, "post", extraConfig);
  }

  protected async put<T = any>(
    axiosInstance: AxiosInstance,
    url: string,
    payload?: object,
    extraConfig?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(axiosInstance, url, payload, "put", extraConfig);
  }

  protected async patch<T = any>(
    axiosInstance: AxiosInstance,
    url: string,
    payload?: object,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(axiosInstance, url, payload, "patch");
  }

  protected async delete<T = any>(
    axiosInstance: AxiosInstance,
    url: string,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(axiosInstance, url, undefined, "delete");
  }
}
