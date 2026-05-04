import type IPaginate from "~/interface/IPaginate";
import guestAxios from "../config/guestAxios";
import BaseApi, { type ApiResponse } from "./base_api";


export interface ProductResponse {
    id: string,
    ypkId: string,
    productName: string,
    productCost: number,
    productInfo: string,
    isProduct: boolean,
    photoPath?: string,
    photoUrl?: string,
    adress: string
}

export interface ProductResponseAny {
    products: ProductResponse[]
}

export interface ProductResponseWithPagination extends IPaginate  {
    items: ProductResponse[]
}
class Product extends BaseApi {
    
    /**
     * Only get all
     */
    async getAll() {
        const response = await this.get<ProductResponseAny>(guestAxios, "/Product/all");
        console.log("Product getAll: ", response)
        return response.data;
    }

    async getWithPaginate(currentPage: number =1) {
        const response = await this.get<ProductResponseWithPagination>(guestAxios, `/Product/pag/all?pageSize=5&page=${currentPage}`);
        console.log("Product getWithPaginate: ", response)
        return response.data;
    }
    
    async getById(id: string) {
        const response = await this.get<ProductResponse>(guestAxios, `/Product/${id}`)
        console.log("Product detail: ", response)
        return response.data;
    }
}

export default new Product
