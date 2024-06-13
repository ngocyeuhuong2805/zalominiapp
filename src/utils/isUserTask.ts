import { Task } from "../models/Task";
import { UserTask } from "../models/UserTask";

export const isUserTask = (task: any): task is UserTask => {
  return (task as UserTask).status !== undefined;
};