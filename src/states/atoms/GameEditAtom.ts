import { atom } from "recoil";
import { appColors } from "../../constants/appColors";
import { GameInstant } from "../../models/GameInstant";

export const GameEditAtom = atom<GameInstant>({
  key: "GameEditAtom",
  default: {
    idGameInstant: "",
    namePoilicy: "",
    descPolicy: "",
    imageBranch: "",
    gameInstantName: "",
    imageBackground: "",
    imageBackgroundCampaign: "",
    color: "Green",
    wintype: "",
    deepLink: "",
    openTime: "",
    closeTime: "",
    createdBy: "",
    totalCanJoin: 0,
  }
});