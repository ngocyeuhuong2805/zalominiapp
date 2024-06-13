import { atom } from "recoil";
import { UserAnswer } from "../../models/UserAnswer";

export const UserAnswerPlayAtom = atom<UserAnswer[]>({
  key: "UserAnswerPlayAtom",
  default: [
    {
      idQuestion: "",
      orderQuestion: 0,
      answerUser: "",
    }
  ]
});