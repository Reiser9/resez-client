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
        setDataAuth: () => initialState
    }
});

export const {
    initUser,
    setDataAuth
} = userSlice.actions;

export default userSlice.reducer;