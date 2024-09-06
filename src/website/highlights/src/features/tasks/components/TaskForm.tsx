import { taskAdded } from '@/features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Box, Button, Group, Menu, Paper, TextInput, rem } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import classes from './TaskForm.module.css';
import { selectListById, taskAddedToTaskList } from '../../taskLists/taskListsSlice';
import { useFocusTrap } from '@mantine/hooks';
import { TaskListSource } from '@/features/taskLists';
import { CreateTask } from '../models/CreateTask';
import { createTask as createMSTask } from '@/services/GraphService';

export function TaskForm({ taskListId }: { taskListId: string }) {
    const dispatch = useAppDispatch();
    const taskList = useAppSelector((state) => selectListById(state, taskListId));
    const focusTrapRef = useFocusTrap();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            dueDate: null,
        },

        validate: {
            title: (value) => (value ? null : ''),
        },
    });

    const handleAddTask = async (values: any) => {

        let task: CreateTask = {
            title: values.title,
            created: new Date().toISOString(),
            dueDate: values.dueDate?.toISOString(),
            taskListId: taskListId,
        };

        let id = undefined;

        if (taskList.source === TaskListSource.MicrosoftToDo) {
            const res = await createMSTask(task);
            id = res.id;
        }

        if (!id) {
            throw new Error('Task creation failed');
        }

        dispatch(taskAdded({
            id,
            status: 'pending',
            ...task,
        }));
        dispatch(taskAddedToTaskList({ taskListId, taskId: id }));
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            form.onSubmit((values) => {
                handleAddTask(values);
            })();
            form.reset();
        }
    };

    return (
        <Paper p={'xs'} radius={'md'} withBorder className={classes.container}>
            <form>
                <TextInput
                    ref={focusTrapRef}
                    leftSectionPointerEvents="none"
                    leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }}></IconPlus>}
                    variant='unstyled'
                    placeholder="Add a task"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                    onKeyDown={handleKeyDown}
                />

                <Group mt="md" gap={'md'}>
                    <Menu shadow="md">
                        <Menu.Target>
                            <Button variant="default" size='compact-sm'>Due date</Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item component={Box} closeMenuOnClick={false} style={{ backgroundColor: 'transparent' }}>
                                <DatePicker
                                    allowDeselect
                                    key={form.key('dueDate')}
                                    {...form.getInputProps('dueDate')}
                                    onChange={(value: any) => form.setFieldValue('dueDate', value)}
                                    defaultDate={form.getValues().dueDate || undefined}
                                />
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group >
            </form >
        </Paper >
    );
}
