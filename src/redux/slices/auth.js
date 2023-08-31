import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    authIsLoading: false
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
        setDataAuth: () => initialState
    }
});

export const {
    setIsAuth,
    setAuthIsLoading,
    setDataAuth
} = authSlice.actions;

export default authSlice.reducer;
