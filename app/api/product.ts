import type IPaginate from "~/interface/IPaginate";
import guestAxios from "../config/guestAxios";
import BaseApi, { type ApiResponse } from "./base_api";
import authAxios from "~/config/authAxios";
import type IBaseValidation from "~/interface/IBaseValidation";

export interface ProductResponse {
  id: string;
  ypkId: string;
  productName: string;
  productCost: number;
  productInfo: string;
  isProduct: boolean;
  photoPath?: string;
  photoUrl?: string;
  address: string;
  statusProductId: string;
}

export interface ProductUpdate {
  id: string;
  productInfo: string;
  productName: string;
  address: string;
  photo: File | null;
  productCost: number;
  isProduct: boolean;
  ypkId: string;
  statusProductId: string;
}


export interface ProductUpdateValidation extends IBaseValidation {
  errors: {
    YpkId?: string[],
    Address?: string[],
    IsProduct?: string[],
    ProductCost?: string[],
    ProductInfo?: string[],
    ProductName?: string[],
    StatusProductId?: string[]
  }
}
export interface ProductResponseAny {
  products: ProductResponse[];
}

export interface ProductResponseWithPagination extends IPaginate {
  items: ProductResponse[];
}
class Product extends BaseApi {
  /**
   * Only get all
   */
  async getAll() {
    const response = await this.get<ProductResponseAny>(
      guestAxios,
      "/Product/all",
    );
    console.log("Product getAll: ", response);
    return response.data;
  }

  async getWithPaginate(currentPage: number = 1) {
    const params = new URLSearchParams({
      pageSize: "5",
      page: String(currentPage),
    });
    const response = await this.get<ProductResponseWithPagination>(
      guestAxios,
      `/Product/pag/all?${params}`,
    );
    console.log("Product getWithPaginate: ", response);
    return response.data;
  }

  async getById(id: string) {
    const response = await this.get<ProductResponse>(
      guestAxios,
      `/Product/${id}`,
    );
    console.log("Product detail: ", response);
    return response.data;
  }

  async postLike(id: string) {}

  async getBySearchTextWithPaginate(searchText: string, page: string) {
    const params = new URLSearchParams({
      searchText,
      pageSize: "5",
      page: page,
    });
    const result = await this.get<ProductResponseWithPagination>(
      guestAxios,
      `Product/pag/all?${params}`,
    );
    return result.data;
  }

  async updateProduct(product: ProductUpdate) {
    const formData = new FormData();
    formData.append("Id", product.id);
    formData.append("YpkId", product.ypkId);
    formData.append("ProductName", product.productName);
    formData.append("ProductCost", String(product.productCost));
    formData.append("ProductInfo", product.productInfo);
    formData.append("IsProduct", String(product.isProduct));
    if (product.photo) formData.append("Photo", product.photo);
    formData.append("address", product.address);
    formData.append("statusProductId", product.statusProductId);

    const result = await this.put(authAxios, "/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Update product: ", result)
    return result;
    // return formData;
  }
}

export default new Product();
