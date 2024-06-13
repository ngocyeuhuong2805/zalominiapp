import { QuestionResponse } from "./QuestionResponse";

export interface UserAnswerResponse {
  question: QuestionResponse;
  answerUser: string;
  createdTime: string;
  updateTime: string;
}