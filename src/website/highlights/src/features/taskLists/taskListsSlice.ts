import { AppUser } from '@/hooks/useAppUser';
import { TaskList } from '@/features/taskLists/TaskList';
import { getTaskLists } from '@/services/api';
import { getTaskLists as getTaskListsGraph } from '@/services/GraphService';
import { RootState } from '@/store';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { TaskListSource } from './TaskListSource';

const defaultState = [
    { id: 'taskList1', title: 'Default', taskIds: [] }
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
            taskIds: [],
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
        taskIds: [],
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
                existingTaskList.taskIds.push(taskId);
            }
        }
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

export const { taskListAdded, taskListRemoved, taskListUpdated, taskAddedToTaskList } = taskListsSlice.actions;

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