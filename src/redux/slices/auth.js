import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    authIsLoading: false,
    verified: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setAuthIsLoading: (state, action) => {
            state.authIsLoading = action.payload;
        },
        setVerified: (state, action) => {
            state.verified = action.payload;
        },
        setDataAuth: () => initialState
    }
});

export const {
    setIsAuth,
    setAuthIsLoading,
    setVerified,
    setDataAuth
} = authSlice.actions;

export default authSlice.reducer;
