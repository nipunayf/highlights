import { HighlightTaskEntity } from "./HighlightTaskEntity";

export interface HighlightTask extends HighlightTaskEntity {
    highlight_name: string;
    dueDate: Date | null;
}



