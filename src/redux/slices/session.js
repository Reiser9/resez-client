import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    sessions: {}
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        initSessions: (state, action) => {
            state.sessions = action.payload;
        }
    }
});

export const {
    initSessions
} = sessionSlice.actions;

export default sessionSlice.reducer;
