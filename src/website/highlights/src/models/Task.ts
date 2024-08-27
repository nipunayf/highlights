import { SetStateAction } from "react";

export interface Task {

    estimatedTime?: SetStateAction<number | null>;
    dueDate?: string;
    Date?: string;
    title: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    reminder?: string;
    priority?: string;
    label?: string;
    status?: 'overdue' | 'pending' | 'completed';
    taskId?: string;

    id: string;
    created: string;
}

export interface Review {
    id: string;
    description: string;
}
