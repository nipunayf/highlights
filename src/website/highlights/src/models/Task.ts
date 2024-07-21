import { Entity } from "./Entity";

export interface Task extends Entity {
    title: string;
    dueDate?: string;
    completed: boolean;
}