import { Task } from "./Task";

export interface UserTask extends Task {
  curentQuantity: number;
  status: string;
}