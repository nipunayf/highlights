// import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '@/store';
// import { Highlight } from '@/models/Highlight';
// import { taskCompleted, taskUncompleted } from '../tasks/tasksSlice';
// import { getHighlights } from '@/services/api';

// const defaultState: Highlight[] = [
//     { id: 'highlight1', title: 'Finish project proposal', date: new Date('2024-07-25').toISOString(), completed: false, taskIds: ['task1', 'task5'], created: new Date().toISOString() },
//     { id: 'highlight2', title: 'Call the client for feedback', date: new Date('2024-07-22').toISOString(), completed: false, taskIds: ['task2', 'task15'], created: new Date().toISOString() },
//     { id: 'highlight3', title: 'Prepare presentation for Monday\'s meeting', date: new Date('2024-07-24').toISOString(), completed: false, taskIds: ['task3', 'task18'], created: new Date().toISOString() },
//     { id: 'highlight4', title: 'Submit quarterly report', date: new Date('2024-07-29').toISOString(), completed: false, taskIds: ['task4', 'task17'], created: new Date().toISOString() }
// ];

// const highlightsAdapter = createEntityAdapter<Highlight>({
//     sortComparer: (a, b) => b.created.localeCompare(a.created)
// });

// interface HighlightsState extends EntityState<Highlight, string> {
//     status: 'idle' | 'loading' | 'succeeded' | 'failed';
//     error: string | undefined;
// }

// const initialState: HighlightsState = highlightsAdapter.getInitialState({
//     status: 'idle',
//     error: undefined
// }, defaultState);

// export const fetchHighlights = createAsyncThunk('highlights/fetchHighlights', async () => {
//     const response = await getHighlights();
//     console.log(response.data);
//     return response.data;
// })

// export const completeTasksForHighlight = createAsyncThunk(
//     'highlights/completeTasksForHighlight',
//     async (highlightId: string, { dispatch, getState }) => {
//         const state = getState() as RootState;
//         const highlight = state.highlights.entities[highlightId];
//         if (highlight) {
//             highlight.taskIds.forEach((taskId: string) => {
//                 dispatch(taskCompleted(taskId));
//             });
//         }
//     }
// );

// export const uncompleteTasksForHighlight = createAsyncThunk(
//     'highlights/uncompleteTasksForHighlight',
//     async (highlightId: string, { dispatch, getState }) => {
//         const state = getState() as RootState;
//         const highlight = state.highlights.entities[highlightId];
//         if (highlight) {
//             highlight.taskIds.forEach((taskId: string) => {
//                 dispatch(taskUncompleted(taskId));
//             });
//         }
//     }
// );

// export const highlightsSlice = createSlice({
//     name: 'highlights',
//     initialState,
//     reducers: {
//         highlightAdded: highlightsAdapter.addOne,
//         highlightRemoved: highlightsAdapter.removeOne,
//         highlightUpdated: highlightsAdapter.upsertOne,
//         highlightCompleted: (state, action: PayloadAction<string>) => {
//             const highlight = state.entities[action.payload];
//             if (highlight) {
//                 state.entities[action.payload] = { ...highlight, completed: true };
//             }
//         },
//         highlightUncompleted: (state, action: PayloadAction<string>) => {
//             const highlight = state.entities[action.payload];
//             if (highlight) {
//                 state.entities[action.payload] = { ...highlight, completed: false };
//             }
//         },
//         taskAddedToHighlight: (state, action) => {
//             const { highlightId, taskId } = action.payload;
//             const highlight = state.entities[highlightId];
//             if (highlight && !highlight.taskIds.includes(taskId)) {
//                 highlight.taskIds.push(taskId);
//             }
//         },
//         taskRemovedFromHighlight: (state, action) => {
//             const { highlightId, taskId } = action.payload;
//             const highlight = state.entities[highlightId];
//             if (highlight) {
//                 highlight.taskIds = highlight.taskIds.filter(id => id !== taskId);
//             }
//         }
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(fetchHighlights.pending, (state, action) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchHighlights.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 highlightsAdapter.upsertMany(state, action.payload);
//             })
//             .addCase(fetchHighlights.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//     }
// })

// export const {
//     highlightAdded,
//     highlightRemoved,
//     highlightUpdated,
//     highlightCompleted,
//     highlightUncompleted,
//     taskAddedToHighlight,
//     taskRemovedFromHighlight
// } = highlightsSlice.actions;

// export default highlightsSlice.reducer;

// export const {
//     selectAll: selectAllHighlights,
//     selectById: selectHighlightById,
//     selectIds: selectHighlightIds
// } = highlightsAdapter.getSelectors((state: RootState) => state.highlights);