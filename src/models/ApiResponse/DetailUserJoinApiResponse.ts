import { UserJoinResponse } from "../ResponseModels/UserJoinResponse";

export interface DetailUserJoinApiResponse {
  data: UserJoinResponse,
  success: boolean;
  message: string;
}