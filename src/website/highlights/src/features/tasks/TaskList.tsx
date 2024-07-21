import { selectTaskById, selectTaskIds } from "@/features/tasks/tasksSlice";
import { useAppSelector } from "@/hooks";
import type { TaskList } from "@/models/TaskList";

let TaskExcerpt = ({ taskId }: { taskId: string }) => {
    const task = useAppSelector(state => selectTaskById(state, taskId))
    return (
        <li key={task.id}>{task.title}</li>
    );
}

export default function TaskList() {
    const orderedTaskIds = useAppSelector(selectTaskIds);

    return (
        <>
            <ul>
                {orderedTaskIds.map((taskId) => (
                    <TaskExcerpt key={taskId} taskId={taskId} />
                ))}
            </ul>
        </>
    )
}