import { InstantGameResponse } from "../ResponseModels/InstantGameResponse";

export interface ListUserLibraryApiResponse {
  data: InstantGameResponse[];
  success: boolean;
  message: string;
  total: number,
  pageIndex: number,
}