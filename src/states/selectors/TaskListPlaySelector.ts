import { selector, selectorFamily } from "recoil";
import { Task } from "../../models/Task";
import { TaskListPlayAtom } from "../atoms/TaskListPlayAtom";


//Lấy cả đối tượng nhiệm vụ của game
export const TaskListPLaySelector = selector<Task[]>({
  key: 'TaskListPLaySelector',
  get: ({ get }) => {
    const gameData = get(TaskListPlayAtom);
    return gameData;
  },
  set: ({ get, set }, newValue: Task[]) => {
    set(TaskListPlayAtom, newValue as Task[])
  }
});


//Lấy title của nhiệm vụ game
export const TaskTitlePLaySelector = selectorFamily<string | undefined, string>({
  key: 'TaskTitlePLaySelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(TaskListPlayAtom);
    const index = parseInt(id || "", 10);
    return gameData[index - 1].title;
  },
});

//Lấy title của nhiệm vụ game
export const TaskQuantityRequirePLaySelector = selectorFamily<number, string>({
  key: 'TaskQuantityRequirePLaySelector',
  get: (id: string) => ({ get }) => {
    const gameData = get(TaskListPlayAtom);
    const index = parseInt(id || "", 10);
    return gameData[index].quantityRequire;
  },
});
