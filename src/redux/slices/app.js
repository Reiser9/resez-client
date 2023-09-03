import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    appIsLoading: false,
    connection: true,
    sidebarShow: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppIsLoading: (state, action) => {
            state.appIsLoading = action.payload
        },
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        setSidebarShow: (state, action) => {
            state.sidebarShow = action.payload;
        },
        setDataApp: () => initialState
    }
});

export const {
    setAppIsLoading,
    setDataApp,
    setConnection,
    setSidebarShow
} = appSlice.actions;

export default appSlice.reducer;
