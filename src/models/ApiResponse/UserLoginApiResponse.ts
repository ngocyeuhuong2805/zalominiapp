import { UserInfoResponse } from "../ResponseModels/UserInfoResponse";

export interface UserLoginApiResponse {
  data: UserInfoResponse,
  success: boolean;
  message: string;
}