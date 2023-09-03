import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: {},
    verificationCodeData: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.user = action.payload || {};
        },
        initCodeData: (state, action) => {
            state.verificationCodeData = action.payload;
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
        setUreadNotifyCount: (state, action) => {
            state.user.unreadNotifiesCount = action.payload;
        },
        decrementUreadNotifyCount: (state) => {
            state.user.unreadNotifiesCount--;
        },
        setUserBlocked: (state, action) => {
            state.user.isBlocked = action.payload;
        },
        setDataUser: () => initialState
    }
});

export const {
    initUser,
    initCodeData,
    changeThemeUser,
    previewThemeUser,
    isPreviewTheme,
    setUreadNotifyCount,
    decrementUreadNotifyCount,
    setUserBlocked,
    setDataUser
} = userSlice.actions;

export default userSlice.reducer;