import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    appIsLoading: false,
    blocked: false,
    connection: true
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsLoading: (state, action) => {
            state.appIsLoading = action.payload
        },
        setBlocked: (state, action) => {
            state.blocked = action.payload
        },
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        setDataApp: () => initialState
    }
});

export const {
    setAppIsLoading,
    setBlocked,
    setDataApp,
    setConnection
} = appSlice.actions;

export default appSlice.reducer;
