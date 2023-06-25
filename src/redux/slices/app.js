import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    appIsLoading: false,
    blocked: false
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
        setDataApp: () => initialState
    }
});

export const {
    setAppIsLoading,
    setBlocked,
    setDataApp
} = appSlice.actions;

export default appSlice.reducer;
