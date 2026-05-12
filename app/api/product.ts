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
    address: string
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

    async getWithPaginate(currentPage: number = 1) {
        const params = new URLSearchParams({ pageSize: "5", page: String(currentPage) });
        const response = await this.get<ProductResponseWithPagination>(guestAxios, `/Product/pag/all?${params}`);
        console.log("Product getWithPaginate: ", response)
        return response.data;
    }
    
    async getById(id: string) {
        const response = await this.get<ProductResponse>(guestAxios, `/Product/${id}`)
        console.log("Product detail: ", response)
        return response.data;
    }

    async postLike(id: string) {
        
    }

    async getBySearchTextWithPaginate(searchText: string, page:string) {
        const params = new URLSearchParams({ searchText, pageSize: "5", page: page });
        const result = await this.get<ProductResponseWithPagination>(guestAxios, `Product/pag/all?${params}`);
        return result.data
    }
}

export default new Product()
