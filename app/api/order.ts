import guestAxios from "~/config/guestAxios";
import BaseApi from "./base_api";
import { type ProductResponse } from "./product";
import type IPaginate from "~/interface/IPaginate";

export interface OrderResponse {
  id: string;
  executorId: string;
  customerId: string;
  date: string;
  statusName: string;
  customersComment: "string";
  userComment: "string";
  productDto: ProductResponse;
}

export interface OrderResponseWithPagination extends IPaginate {
  items: OrderResponse[];
}

class Order extends BaseApi {
  async getWithPaginate(currentPage: number = 1) {
    const params = new URLSearchParams({ pageSize: "5", page: String(currentPage) });
    const response = await this.get<OrderResponseWithPagination>(
      guestAxios,
      `order/pag/all?${params}`,
    );
    console.log("Order getAll: ", response.data);
    return response.data;
  }
}

export default new Order();
