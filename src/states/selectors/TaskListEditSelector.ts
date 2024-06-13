import { selector, selectorFamily } from "recoil";
import { Task } from "../../models/Task";
import { TaskListEditAtom } from "../atoms/TaskListEditAtom";


//Lấy cả đối tượng nhiệm vụ của game
export const TaskListEditSelector = selector<Task[]>({
    key: 'TaskListEditSelector',
    get: ({ get }) => {
      const gameData = get(TaskListEditAtom);
      return gameData;
    },
    set:({get, set}, newValue:Task[])=>{
      set(TaskListEditAtom, newValue as Task[] )
    }
  });


//Lấy title của nhiệm vụ game
export const TaskTitleEditSelector = selectorFamily<string, string>({
    key: 'TaskTitleEditSelector',
    get: (id: string) => ({ get }) => {
      const gameData = get(TaskListEditAtom);
      const index = parseInt(id || "", 10);
      return gameData[index].title;
    },
    set: (id: string) => ({ get, set }, newValue: string) => {
      const currentGameData = get(TaskListEditAtom);
      const index = parseInt(id || "", 10);
      const updatedGameData = currentGameData.map((task, i) => 
        task.id === id ? { ...task, title: newValue } : task
      );
      set(TaskListEditAtom, updatedGameData);
    },
  });

  //Lấy title của nhiệm vụ game
export const TaskQuantityRequireEditSelector = selectorFamily<number, string>({
    key: 'TaskQuantityRequireEditSelector',
    get: (id: string) => ({ get }) => {
      const gameData = get(TaskListEditAtom);
      const index = parseInt(id || "", 10);
      return gameData[index].quantityRequire;
    },
    set: (id: string) => ({ get, set }, newValue: number) => {
      const currentGameData = get(TaskListEditAtom);
      const index = parseInt(id || "", 10);
      const updatedGameData = currentGameData.map((task, i) => 
        task.id === id ? { ...task, quantityRequire: newValue } : task
      );
      set(TaskListEditAtom, updatedGameData);
    },
});

