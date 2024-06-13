import { PlanResponse } from "./PlanResponse";

interface Response {
  originalImageUrl: string,
  separationImages: string[],
}

export interface QuestionResponse {
  _id: string,
  order: number;
  questionText: string;
  questionImage: Response;
  plans: PlanResponse[];
  url: string;
  result: string;
}