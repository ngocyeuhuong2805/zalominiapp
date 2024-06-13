import { InstantGameResponse } from "../ResponseModels/InstantGameResponse";

export interface DetailGameApiResponse {
  data: InstantGameResponse;
  success: boolean;
  message: string;
}