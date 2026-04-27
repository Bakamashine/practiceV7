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

class Product extends BaseApi {
    
    /**
     * Only get all
     */
    async getAll() {
        const response = await this.get<ProductResponseAny>(guestAxios, "/Product/All");
        console.log("Product getAll: ", response)
        return response.data;
    }

    async getById(id: string) {
        const response = await this.get<ProductResponse>(guestAxios, `/Product/${id}`)
        console.log("Product detail: ", response)
        return response.data;
    }
}

export default new Product
