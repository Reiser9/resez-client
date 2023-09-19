import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    logsIsLoading: false,
    logs: {}
};

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        setLogsIsLoading: (state, action) => {
            state.logsIsLoading = action.payload;
        },
        initLogs: (state, action) => {
            state.logs = action.payload;
        },
        setLogs: (state, action) => {
            const currentLogs = state.logs.logs;

            state.logs = {
                ...action.payload,
                logs: currentLogs ? [...currentLogs, ...action.payload.logs] : [...action.payload.logs]
            };
        },
        setDataLog: () => initialState
    }
});

export const {
    setLogsIsLoading,
    initLogs,
    setLogs,
    setDataLog
} = logSlice.actions;

export default logSlice.reducer;
