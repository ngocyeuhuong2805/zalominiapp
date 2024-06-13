import { atom } from "recoil";
import { UserAnswer } from "../../models/UserAnswer";
import { UserTask } from "../../models/UserTask";

export const UserTaskPlayAtom = atom<UserTask[]>({
  key: "UserTaskPlayAtom",
  default: [
    {
      id: "",
      curentQuantity: 0,
      status: "UnDone",
      title: "",
      quantityRequire: 0,
      oaId: "",
      type: ""
    }
  ]
});
