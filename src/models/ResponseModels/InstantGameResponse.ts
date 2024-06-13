import { BrandImageResponse } from "./BrandImageResponse";
import { ConfigGameResponse } from "./ConfigGameResponse";
import { PlanResponse } from "./PlanResponse";
import { PolicyResponse } from "./PolicyResponse";
import { PrizeResponse } from "./PrizeResponse";
import { QuestionResponse } from "./QuestionResponse";
import { TaskResponse } from "./TaskResponse";

export interface InstantGameResponse {
  gameSampleId: string;
  deeplink: string;
  openTime: Date;
  closeTime: Date;
  statusGameInstant: string;
  gamePublish: any;
  tracking: any;
  configGame: ConfigGameResponse;
  policy: PolicyResponse;
  questions: QuestionResponse[];
  prize: PrizeResponse[];
  tasks: TaskResponse[];
  brandImage: BrandImageResponse;
  _id: string;
  createdDate: Date;
  createdBy: string;
  lastUpdatedDate: Date;
  lastUpdatedBy: Date;
  isDeleted: boolean;
}
