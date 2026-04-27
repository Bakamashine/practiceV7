import BaseApi from "./base_api";
import { type ProductResponse } from "./product";

export interface OrderResponse {
  id: string;
  executorId: string;
  customerId: string;
  date: string;
  statusName: string;
  customersComment: "string";
  userComment: "string";
  productDto: ProductResponse
}

class Order extends BaseApi {}

export default new Order();
