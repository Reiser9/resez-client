import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.user = action.payload || {};
        },
        changeThemeUser: (state, action) => {
            state.user.theme = {...action.payload}
        },
        previewThemeUser: (state, action) => {
            state.user.previewTheme = {...action.payload}
        },
        isPreviewTheme: (state, action) => {
            state.user.isPreviewTheme = action.payload;
        },
        setDataUser: () => initialState
    }
});

export const {
    initUser,
    changeThemeUser,
    previewThemeUser,
    isPreviewTheme,
    setDataUser
} = userSlice.actions;

export default userSlice.reducer;