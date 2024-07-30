import { Entity } from "./Entity";

export interface Task extends Entity {
    completed: any;
    dueDate: Date | null;
    Date: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    reminder: string;
    priority: string;
    label: string;
    status: 'overdue' | 'pending' | 'completed';
}

// export interface Task {
//     id: string;
//     created: string;
//     title: string;
//     dueDate?: string;
//     completed: boolean;
// }