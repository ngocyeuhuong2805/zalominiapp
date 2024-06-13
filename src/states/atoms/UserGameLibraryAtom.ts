import { atom } from "recoil";
import { GameInstant } from "../../models/GameInstant";
import { GameSample } from "../../models/GameSample";
import { Question } from "../../models/Question";

export const UserGameLibraryAtom = atom<GameInstant[]>({
  key: "UserGameLibraryAtom",
  default: [
    {
      idGameInstant: "",
      namePoilicy: "",
      descPolicy: "",
      imageBranch: "",
      gameInstantName: "Game của bạn",
      imageBackground: "",
      imageBackgroundCampaign: "",
      color: "Green",
      wintype: "",
      deepLink: "",
      openTime: "",
      closeTime: "",
      createdBy: "",
      totalCanJoin: 0
    }
  ]
});