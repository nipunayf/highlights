import { fetchTasks, selectTaskById, taskCompleted, taskRemoved, taskUncompleted } from "@/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { TaskList } from "@/features/taskLists/TaskList";
import { Button, Checkbox, Group, Menu, Paper, Stack, Text } from "@mantine/core";
import { selectTaskListById } from "../taskLists/taskListsSlice";
import classes from './TaskList.module.css';
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";

let TaskExcerpt = ({ taskId }: { taskId: string }) => {
    const dispatch = useAppDispatch();
    const task = useAppSelector(state => selectTaskById(state, taskId))

    const handleDelete = () => {
        dispatch(taskRemoved(task.id));
    };

    if (!task) return null;

    return (
        <Paper
            component={Group}
            w={'100%'}
            shadow={'xs'}
            radius={'md'}
            px={'md'}
            key={task.id}
            className={classes.task}
            withBorder
        >
            <Group>
                <Checkbox
                    radius={'lg'}
                    checked={task.status === 'completed'}
                    onChange={() => { task.status === 'completed' ? dispatch(taskUncompleted(task.id)) : dispatch(taskCompleted(task.id)) }}
                />
                <Text
                    td={task.status === 'completed' ? 'line-through' : ''}
                >{task.title}</Text>
            </Group>
            <Menu shadow="md">
                <Menu.Target>
                    <Button ml={'auto'} variant="transparent" color="dark"><IconDotsVertical size={18} /></Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconTrash size={14} />} onClick={handleDelete}>
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Paper>
    );
}

export default function TaskList({ taskListId }: { taskListId: string }) {
    const dispatch = useAppDispatch();

    const taskList = useAppSelector((state) => selectTaskListById(state, taskListId));
    const orderedTaskIds = taskList.taskIds;

    if (orderedTaskIds === undefined) {
        dispatch(fetchTasks(taskList));
    }

    return (
        <Stack gap={'xs'}>
            {orderedTaskIds?.map((taskId) => (
                <TaskExcerpt key={taskId} taskId={taskId} />
            ))}
        </Stack>
    )
}