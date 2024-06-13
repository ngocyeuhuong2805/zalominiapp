import { atom } from "recoil";
import { Task } from "../../models/Task";

export const TaskListEditAtom = atom<Task[]>({
  key: "TaskListEditAtom",
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