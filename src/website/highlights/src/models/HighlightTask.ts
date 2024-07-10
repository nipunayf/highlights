import { HighlightTaskEntity } from "./HighlightTaskEntity";

export interface HighlightTask extends HighlightTaskEntity {
    title: string;
    dueDate: Date | null;
}



