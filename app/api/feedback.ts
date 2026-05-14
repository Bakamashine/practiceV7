import guestAxios from "~/config/guestAxios";
import BaseApi from "./base_api";
import type IBaseValidation from "~/interface/IBaseValidation";
import type IPaginate from "~/interface/IPaginate";
import authAxios from "~/config/authAxios";

export interface FeedbackCreate {
  Comment: string;
  Rating: string;
}

export interface FeedbackUser {
  id: string;
  fullname: string;
  hashPassword: string;
  phoneNumber: string;
  userInfo: string;
  isActive: true;
  avatarPath: string;
  avatarUrl: string;
  role: {
    id: string;
    name: string;
  };
  ypk: null;
}

export interface FeedbackResponse {
  id: string;
  comment: string;
  raiting: string;
  user: FeedbackUser;
}

export interface FeedbackResponseWithPagination extends IPaginate {
  items: FeedbackResponse[];
}

export interface FeedbackValidation extends IBaseValidation {
  errors: {
    Comment?: string[];
    Rating?: string[];
  };
}

class Feedback extends BaseApi {
  async create(feedback: FeedbackCreate) {
    const formData = new FormData();
    formData.append("Comment", feedback.Comment);
    formData.append("Rating", feedback.Rating);
    const result = await this.post<string | FeedbackValidation>(
      guestAxios,
      "feedback",
      formData,
    );
    console.log("Create feedback: ", result);
    return result;
  }

  async getAllWithPaginate(page: number = 1) {
    const params = new URLSearchParams({
      pageSize: "6",
      page: String(page),
    });
    const result = await this.get<FeedbackResponseWithPagination>(
      guestAxios,
      `/feedback/pag/all?${params}`,
    );
    console.log("Feedback getAllWithPaginate: ", result);
    return result.data;
  }

  async destroy(idFeedback: string) {
    const result = await this.delete(authAxios, `/feedback/${idFeedback}`)
    console.log("Destroy feedback: ", result)
    return result
  }
}

export default new Feedback();
