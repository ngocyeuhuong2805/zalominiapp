import { UserAnswerResponse } from "./UserAnswerResponse";
import { UserInfoResponse } from "./UserInfoResponse";
import { UserTaskResponse } from "./UserTaskResponse";

export interface UserJoinResponse {
  userInfo: UserInfoResponse;
  userIdShare: string;
  gameInstantId: string;
  gameSampleId: string;
  answers: UserAnswerResponse[];
  tasks: UserTaskResponse[];
  luckyNumber: number;
  phoneNumberReceiver: string;
  deeplinkShare: string;
  joinTimes: Date;
  _id: string;
  createdDate: string;
  createdBy: string;
  lastUpdatedDate: Date;
  lastUpdatedBy: Date;
  isDeleted: boolean;
  success: boolean;
  message: string;
}