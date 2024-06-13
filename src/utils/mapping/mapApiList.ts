import { ListSampleApiResponse } from "../../models/ApiResponse/ListSampleApiResponse";
import { ListUserLibraryApiResponse } from "../../models/ApiResponse/ListUserLibraryApiResponse";
import { GameInstant } from "../../models/GameInstant";
import { InstantGameResponse } from "../../models/ResponseModels/InstantGameResponse";
import { SampleGameResponse } from "../../models/ResponseModels/SampleGameResponse";

//Map list game mẫu trong kho game
export const mapSampleListApi = (response: ListSampleApiResponse) => {
  let newData: GameInstant[] = response.data.map((item: SampleGameResponse) => ({
    idGameInstant: item._id,
    namePoilicy: "",
    descPolicy: "",
    imageBranch: item.brandImage.url,
    gameInstantName: item.configGame.gameInstantName,
    imageBackground: "",
    imageBackgroundCampaign: item.configGame.imageBackGroundCampaign,
    color: "",
    wintype: "",
    deepLink: "",
    openTime: "",
    closeTime: "",
    createdBy: "",
    totalCanJoin: 0,
  }));
  return newData;
}

//Map list game trong game của tôi
export const mapUserLibraryApi = (response: ListUserLibraryApiResponse) => {
  let newData: GameInstant[] = response.data.map((item: InstantGameResponse) => ({
    idGameInstant: item._id,
    namePoilicy: "",
    descPolicy: "",
    imageBranch: item.brandImage.url,
    gameInstantName: item.configGame.gameInstantName,
    imageBackground: "",
    imageBackgroundCampaign: item.configGame.imageBackGroundCampaign,
    color: "",
    wintype: "",
    deepLink: "",
    openTime: "",
    closeTime: "",
    createdBy: "",
    totalCanJoin: 0
  }));
  return newData;
}