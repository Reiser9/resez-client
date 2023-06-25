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
        setDataUser: () => initialState
    }
});

export const {
    initUser,
    setDataUser
} = userSlice.actions;

export default userSlice.reducer;