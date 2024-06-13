import { SampleGameResponse } from "../ResponseModels/SampleGameResponse";

export interface ListSampleApiResponse {
  data: SampleGameResponse[];
  success: boolean;
  message: string;
  total: number,
  pageIndex: number,
}