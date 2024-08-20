import { AppUser } from '@/hooks/useAppUser';
import { TaskList } from '@/features/taskLists/TaskList';
import { getTaskLists } from '@/services/api';
import { getTaskLists as getTaskListsGraph } from '@/services/GraphService';
import { RootState } from '@/store';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { TaskListSource } from './TaskListSource';

const defaultState = [
    { id: 'taskList1', title: 'Default', taskIds: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10', 'task11', 'task12', 'task13', 'task14', 'task15', 'task16', 'task17', 'task18', 'task19', 'task20'] }
];

interface TaskListsState extends EntityState<TaskList, string> {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}

const taskListsAdapter = createEntityAdapter<TaskList>();

const initialState: TaskListsState = taskListsAdapter.getInitialState({
    status: 'idle',
    error: undefined
}, defaultState);

export const fetchTaskLists = createAsyncThunk('taskLists/fetch', async (user: AppUser) => {
    const response = await getTaskLists(user);
    let taskLists = [];
    for (let taskList of response) {
        taskLists.push({
            id: taskList.id,
            title: taskList.title,
            source: TaskListSource.Highlights
        });
    }
    return taskLists;
});

export const fetchMSToDoTaskLists = createAsyncThunk('taskLists/fetchFromMSToDo', async () => {
    const lists = await getTaskListsGraph();
    return lists.map(list => ({
        id: list.id,
        title: list.title,
        source: TaskListSource.MicrosoftToDo
    }));
});

export const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        taskListAdded: taskListsAdapter.addOne,
        taskListRemoved: taskListsAdapter.removeOne,
        taskListUpdated: taskListsAdapter.updateOne,
        taskAddedToTaskList(state, action: PayloadAction<{ taskListId: string, taskId: string }>) {
            const { taskListId, taskId } = action.payload;
            const existingTaskList = state.entities[taskListId];
            if (existingTaskList) {
                if (!existingTaskList.taskIds)
                    existingTaskList.taskIds = [];
                existingTaskList.taskIds.push(taskId);
            }
        },
        updateTaskListWithTasks: (state, action) => {
            const { taskListId, taskIds } = action.payload;
            const taskList = state.entities[taskListId];
            if (taskList) {
                taskList.taskIds = taskIds;
                state.entities[taskListId] = taskList;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskLists.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTaskLists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                taskListsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchTaskLists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMSToDoTaskLists.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMSToDoTaskLists.fulfilled, (state, action) => {
                state.status = 'succeeded';
                taskListsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchMSToDoTaskLists.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {
    taskListAdded,
    taskListRemoved,
    taskListUpdated,
    taskAddedToTaskList,
    updateTaskListWithTasks
} = taskListsSlice.actions;

export default taskListsSlice.reducer;

export const {
    selectAll: selectAllTaskLists,
    selectById: selectTaskListById,
    selectIds: selectTaskListIds,
    selectEntities: selectTaskListEntities
} = taskListsAdapter.getSelectors((state: RootState) => state.taskLists);

export const selectDefaultTaskList = (state: RootState): TaskList => {
    const taskLists = selectAllTaskLists(state);
    const taskList = taskLists.find(taskList => taskList.title === 'Default');
    if (taskList) {
        return taskList;
    }
    return taskLists[0];
}

export const selectUserTaskLists = (state: RootState): TaskList[] => {
    const taskLists = selectAllTaskLists(state);
    return taskLists.filter(taskList => taskList.title !== 'Default');
}

export const selectUserTaskListIds = (state: RootState): string[] => {
    const taskLists = selectUserTaskLists(state);
    return taskLists.map(taskList => taskList.id);
}

export const selectTaskListIdsBySource = createSelector(
    [selectAllTaskLists, (state: RootState, source: TaskListSource) => source],
    (taskLists, source) => taskLists.filter(taskList => taskList.source === source).map(taskList => taskList.id)
);