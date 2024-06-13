
import { QuestionResponse } from "../ResponseModels/QuestionResponse";

export interface QuestionApiResponse {
  data: QuestionResponse;
  success: boolean;
  message: string;
}