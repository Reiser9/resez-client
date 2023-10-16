import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: {},
    profileData: {},
    verificationCodeData: {},
    sessionId: ""
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.user = action.payload || {};
        },
        initProfileData: (state, action) => {
            state.profileData = action.payload || {};
        },
        initCodeData: (state, action) => {
            state.verificationCodeData = action.payload || {};
        },
        changeThemeUser: (state, action) => {
            state.user = {
                ...state.user,
                theme: action.payload
            }
        },
        previewThemeUser: (state, action) => {
            state.user = {
                ...state.user,
                previewTheme: action.payload
            }
        },
        isPreviewTheme: (state, action) => {
            state.user = {
                ...state.user,
                isPreviewTheme: action.payload
            }
        },
        setUreadNotifyCount: (state, action) => {
            state.user = {
                ...state.user,
                unreadNotifiesCount: action.payload
            }
        },
        decrementUreadNotifyCount: (state) => {
            state.user.unreadNotifiesCount--;
        },
        incrementUreadNotifyCount: (state) => {
            state.user.unreadNotifiesCount++;
        },
        setUserBlocked: (state, action) => {
            state.user = {
                ...state.user,
                isBlocked: action.payload
            }
        },
        initSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        updateUserSettings: (state, action) => {
            const currentUserSettings = state.user.settings;

            if(!currentUserSettings){
                return;
            }

            state.user = {
                ...state.user,
                settings: {...action.payload}
            }
        },
        setDataUser: () => initialState
    }
});

export const {
    initUser,
    initProfileData,
    initCodeData,
    changeThemeUser,
    previewThemeUser,
    isPreviewTheme,
    setUreadNotifyCount,
    decrementUreadNotifyCount,
    incrementUreadNotifyCount,
    setUserBlocked,
    initSessionId,
    updateUserSettings,
    setDataUser
} = userSlice.actions;

export default userSlice.reducer;