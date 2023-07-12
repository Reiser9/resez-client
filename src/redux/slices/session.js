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
        },
        setSessions: (state, action) => {
            const currentOther = state.sessions.other;

            state.sessions = {
                ...action.payload,
                other: [...currentOther, ...action.payload?.other]
            };
        },
        endSessionById: (state, action) => {
            const index = state.sessions?.other?.findIndex(obj => obj.id === action.payload.id);

            if(index !== -1){
                state.sessions?.other?.splice(index, 1, action.payload);
            }
        },
        setDataSession: () => initialState
    }
});

export const {
    setSessionsIsLoading,
    initSessions,
    setSessions,
    endSessionById,
    setDataSession
} = sessionSlice.actions;

export default sessionSlice.reducer;
