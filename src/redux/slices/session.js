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
            if(state.sessions.other){
                const currentOther = state.sessions.other;

                state.sessions = {
                    ...action.payload,
                    other: [...currentOther, ...action.payload?.other]
                };
            }
            else{
                state.sessions = action.payload;
            }
        },
        setDataSession: () => initialState
    }
});

export const {
    setSessionsIsLoading,
    initSessions,
    setDataSession
} = sessionSlice.actions;

export default sessionSlice.reducer;
