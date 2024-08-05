import { Entity } from "./Entity";

export interface Task extends Entity {
    // status: any;
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
    label:string;
    status: 'overdue' | 'pending' | 'completed';
    

   
    
}