import { selector, selectorFamily } from "recoil";
import { UserTask } from "../../models/UserTask";
import { UserTaskPlayAtom } from "../atoms/UserTaskPlayAtom";

//Set user task của người chơi
export const UserTaskPlaySelector = selector<UserTask[]>({
  key: 'UserTaskPlaySelector',
  get: ({ get }) => {
    const userTask = get(UserTaskPlayAtom);
    return userTask;
  },
  set: ({ get, set }, newValue: any) => {
    set(UserTaskPlayAtom, newValue as UserTask[])
  }
});
