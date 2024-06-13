import { GameSample } from "../GameSample";
import { SampleGameResponse } from "../ResponseModels/SampleGameResponse";

export interface DetailSampleApiResponse {
  data: SampleGameResponse;
  success: boolean;
  message: string;
}