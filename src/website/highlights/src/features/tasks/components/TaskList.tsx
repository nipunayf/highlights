import { fetchTasks, selectTaskById, taskCompleted, taskRemoved, taskUncompleted } from "@/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button, Checkbox, Group, Menu, Paper, Stack, Text } from "@mantine/core";
import { selectListById, taskRemovedFromTaskList } from "../../taskLists/taskListsSlice";
import classes from './TaskList.module.css';
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { deleteTask } from "@/services/GraphService";

let TaskExcerpt = ({ taskId, taskListId }: { taskId: string, taskListId: string }) => {
    const dispatch = useAppDispatch();
    const task = useAppSelector(state => selectTaskById(state, taskId))

    const handleDelete = () => {
        deleteTask(taskListId, taskId);
        dispatch(taskRemoved(task.id));
        dispatch(taskRemovedFromTaskList({ taskListId, taskId }));
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
            wrap="nowrap"
        >
            <Group wrap="nowrap">
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
                    <Button style={{ flexShrink: 0 }} ml={'auto'} variant="transparent" color="dark"><IconDotsVertical size={18} /></Button>
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

export function TaskList({ taskListId }: { taskListId: string }) {
    const dispatch = useAppDispatch();

    const taskList = useAppSelector((state) => selectListById(state, taskListId));
    const orderedTaskIds = taskList.taskIds;

    if (orderedTaskIds === undefined) {
        dispatch(fetchTasks(taskList));
    }

    return (
        <Stack py={'md'} gap={'xs'}>
            {orderedTaskIds?.map((taskId) => (
                <TaskExcerpt key={taskId} taskId={taskId} taskListId={taskListId} />
            ))}
        </Stack>
    )
}