import { atom } from "recoil";
import { GameSample } from "../../models/GameSample";
import { Question } from "../../models/Question";

export const ListSampleGameAtom = atom<GameSample[]>({
  key: "ListSampleGameAtom",
  default: [
    {
      idGameInstant: "",
      imageBranch: "",
      gameInstantName: "Game mẫu",
      imageBackgroundCampaign: "",
      color: "Green",
    }
  ]
});