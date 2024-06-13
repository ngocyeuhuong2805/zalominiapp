import { DetailUserJoinApiResponse } from "../../models/ApiResponse/DetailUserJoinApiResponse";
import { UserAnswerResponse } from "../../models/ResponseModels/UserAnswerResponse";
import { UserTaskResponse } from "../../models/ResponseModels/UserTaskResponse";
import { UserAnswer } from "../../models/UserAnswer";
import { UserJoin } from "../../models/UserJoin";
import { UserTask } from "../../models/UserTask";

//Detail của user join
export const mapUserJoinDetail = (response: DetailUserJoinApiResponse) => {
  let item = response.data
  let newData: UserJoin = {
    idUserJoin: item._id,
    luckyNumber: item.luckyNumber,
    phoneNumberReceiver: item.phoneNumberReceiver,
    deeplinkShare: item.deeplinkShare,
  }
  return newData;
}

//Detail của nhiệm vụ đã hoàn thành user join
export const mapUserTaskDetail = (response: DetailUserJoinApiResponse) => {
  let list = response.data.tasks
  let newData: UserTask[] = list.map((item: UserTaskResponse) => ({
    id: "",
    curentQuantity: item.curentQuantity,
    status: item.status,
    title: item.taskName,
    quantityRequire: item.quantityRequire,
    oaId: item.brandUri,
    type: item.type
  }));
  return newData;
}

//Detail của câu trả lời của user
export const mapUserAnswerDetail = (response: DetailUserJoinApiResponse) => {
  let list = response.data.answers
  let newData: UserAnswer[] = list.map((item: UserAnswerResponse) => ({
    idQuestion: item.question._id,
    orderQuestion: item.question.order,
    answerUser: item.answerUser,
  }));
  return newData;
}
