import { atom } from "recoil";
import { Question } from "../../models/Question";

export const QuestionListPlayAtom = atom<Question[]>({
  key: "QuestionListPlayAtom",
  default: [
    {
      id: "",
      order: 1,
      questionText: "",
      result: "",
      plans: ["", "", "", ""],
      url: ""
    }
  ]
});

