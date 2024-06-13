import { DetailGameApiResponse } from "../../models/ApiResponse/DetailGameApiResponse";
import { DetailSampleApiResponse } from "../../models/ApiResponse/DetailSampleApiResponse";
import { DetailUserJoinApiResponse } from "../../models/ApiResponse/DetailUserJoinApiResponse";
import { GameInstant } from "../../models/GameInstant";
import { Prize } from "../../models/Prize";
import { Question } from "../../models/Question";
import { PrizeResponse } from "../../models/ResponseModels/PrizeResponse";
import { QuestionResponse } from "../../models/ResponseModels/QuestionResponse";
import { TaskResponse } from "../../models/ResponseModels/TaskResponse";
import { Task } from "../../models/Task";

//Detail của game mẫu
export const mapSampleGameDetail = (response: DetailSampleApiResponse) => {
  let item = response.data
  let newData: GameInstant = {
    idGameInstant: item._id || "",
    namePoilicy: "",
    descPolicy: item.policy.description || "",
    imageBranch: item.brandImage.url || "",
    gameInstantName: item.configGame.gameInstantName || "",
    imageBackground: item.configGame.imageBackGround || "",
    imageBackgroundCampaign: item.configGame.imageBackGroundCampaign || "",
    color: item.configGame.color || "",
    wintype: "",
    deepLink: "",
    openTime: "",
    closeTime: "",
    createdBy: "",
    totalCanJoin: item.policy.totalCanJoin || 0,
  }
  return newData;
}

//Detail của game instant
export const mapGameDetail = (response: DetailGameApiResponse) => {
  let item = response.data
  let newData: GameInstant = {
    idGameInstant: item._id || "",
    namePoilicy: "",
    totalCanJoin: item.policy?.totalCanJoin || 0,
    descPolicy: item.policy?.description || "",
    imageBranch: item.brandImage.url || "",
    gameInstantName: item.configGame?.gameInstantName || "",
    imageBackground: item.configGame?.imageBackGround || "",
    imageBackgroundCampaign: item.configGame?.imageBackGroundCampaign || "",
    color: item.configGame?.color || "",
    wintype: item.configGame?.winType || "",
    deepLink: item.deeplink || "",
    openTime: (item.openTime instanceof Date ? item.openTime.toISOString() : "") || "",
    closeTime: (item.closeTime instanceof Date ? item.closeTime.toISOString() : "") || "",
    createdBy: item.createdBy || "",
  }
  return newData;
}

//Detail của câu hỏi game instant
export const mapGameQuestionDetail = (response: DetailGameApiResponse) => {
  let list = response.data.questions
  let newData: Question[] = list.map((item: QuestionResponse) => ({
    id: item._id || "",
    order: item.order || 0, //Số thứ tự
    questionText: item.questionText || "",
    url: item.questionImage?.originalImageUrl || "",
    result: item.result || "", //Đáp án lấy từ phương án
    plans: item.plans?.map(ob => ob.planValue) || []
  }));
  return newData;
}

//Detail của giải thưởng game instant
export const mapGamePrizeDetail = (response: DetailGameApiResponse) => {
  let list = response.data.prize
  let newData: Prize[] = list.map((item: PrizeResponse) => ({
    id: item._id || "",
    title: item.title || "", //Tiêu đề
    quantity: item.quantity || 0, //Số lượng
    desc: item.description || "", //Mô tả
    imageUrl: item.imageUrl?.url || "",
    priceName: item.priceName || ""
  }));
  return newData;
}

//Detail của nhiệm vụ game instant
export const mapGameTaskDetail = (response: DetailGameApiResponse) => {
  let list = response.data.tasks
  let newData: Task[] = list.map((item: TaskResponse) => ({
    id: "",
    title: item.taskName || "",
    quantityRequire: item.quantityRequire || 0, // Số lượng cần để hoàn thành nhiệm vụ
    type: item.type || "",
    oaId: item.brandUri || ""
  }));
  return newData;
}


