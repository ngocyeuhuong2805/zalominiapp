import { PrizeImageResponse } from "./PrizeImageResponse";

export interface PrizeResponse {
  _id: string,
  title: string;
  quantity: number;
  imageUrl: PrizeImageResponse;
  priceName: string;
  description: string;
}