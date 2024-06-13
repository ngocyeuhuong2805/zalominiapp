  import { atom } from "recoil";
  import { Question } from "../../models/Question";

  export const QuestionListEditAtom = atom<Question[]>({
    key: "QuestionListEditAtom",
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