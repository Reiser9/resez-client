import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    sessionsIsLoading: false,
    sessions: {}
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionsIsLoading: (state, action) => {
            state.sessionsIsLoading = action.payload;
        },
        initSessions: (state, action) => {
            state.sessions = action.payload;
        }
    }
});

export const {
    setSessionsIsLoading,
    initSessions
} = sessionSlice.actions;

export default sessionSlice.reducer;
