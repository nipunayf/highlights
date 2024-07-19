import { Entity } from "./Entity";
import { Task } from "./Task";

export interface TaskList extends Entity {
    title: string;
    tasks: Task[];
}