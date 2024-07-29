export interface Task {
    id: string;
    created: string;
    title: string;
    dueDate?: string;
    completed: boolean;
}