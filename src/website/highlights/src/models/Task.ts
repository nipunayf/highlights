import { Entity } from "./Entity";

export interface Task extends Entity {
    completed: any;
    // Date: ReactNode;
   
    // title: string;
    dueDate: Date | null;
    Date: string;
    title: string;
    description: string;
    // Date: string;
    startTime: string;
    endTime: string;
    reminder: string;
    priority: string;
   
    
}