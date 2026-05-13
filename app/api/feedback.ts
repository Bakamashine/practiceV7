import authAxios from "~/config/authAxios";
import BaseApi from "./base_api";
import type IBaseValidation from "~/interface/IBaseValidation";

export interface FeedbackCreate {
  Comment: string;
  Rating: string;
}

export interface FeedbackValidation extends IBaseValidation {
  errors: {
    Comment?: string[];
    Rating?: string[];
  };
}

class Feedback extends BaseApi {
  async create(feedback: FeedbackCreate) {
    // TODO: 500-ую даёт
    const formData = new FormData();
    formData.append("Comment", feedback.Comment);
    formData.append("Rating", feedback.Rating);
    const result = await this.post<string | FeedbackValidation>(
      authAxios,
      "feedback",
      formData,
    );
    console.log("Create feedback: ", result);
    return result;
  }
}

export default new Feedback();
