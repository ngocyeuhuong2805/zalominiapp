import { atom } from "recoil";
import { appColors } from "../../constants/appColors";
import { GameInstant } from "../../models/GameInstant";

export const GamePlayAtom = atom<GameInstant>({
  key: "GamePlayAtom",
  default: {
    idGameInstant: "",
    namePoilicy: "",
    descPolicy: "",
    imageBranch: "",
    gameInstantName: "Default Title",
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