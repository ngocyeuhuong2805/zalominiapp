import { atom } from "recoil";
import { Task } from "../../models/Task";

export const TaskListPlayAtom = atom<Task[]>({
  key: "TaskListPlayAtom",
  default: [
    {
      id: "",
      title: "",
      quantityRequire: 0,
      type: "",
      oaId: ""
    }
  ]
});