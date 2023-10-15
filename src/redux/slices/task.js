import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    taskIsLoading: false,
    tasks: []
};

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTaskIsLoading: (state, action) => {
            state.taskIsLoading = action.payload;
        },
        initTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setTasks: (state, action) => {
            const currentTasks = state.tasks.tasks;

            state.tasks = {
                ...action.payload,
                tasks: currentTasks ? [...currentTasks, ...action.payload.tasks] : [...action.payload.tasks]
            };
        },
        setDataTask: () => initialState
    }
});

export const {
    setTaskIsLoading,
    initTasks,
    setTasks,
    setDataTask
} = taskSlice.actions;

export default taskSlice.reducer;
