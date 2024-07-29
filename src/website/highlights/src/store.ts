import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/tasksSlice';
import taskListsReducer from './features/taskLists/taskListsSlice';
import highlightsReducer from './features/highlights/highlightsSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        taskLists: taskListsReducer,
        highlights: highlightsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;