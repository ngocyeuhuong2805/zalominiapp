import { QuestionApiResponse } from "../../models/ApiResponse/QuestionApiResponse";
import { Question } from "../../models/Question";

export const mapQuestionApi = (response: QuestionApiResponse) => {
  const item = response.data
  let newData: Question = {
    id: item._id,
    order: item.order,
    questionText: item.questionText,
    url: item.questionImage?.originalImageUrl || "",
    result: item.result,
    plans: item.plans?.map(item => item.planValue)
  };
  return newData;
}
