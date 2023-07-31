import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    usersIsLoading: false,
    users: []
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsersIsLoading: (state, action) => {
            state.usersIsLoading = action.payload;
        },
        initUsers: (state, action) => {
            state.users = action.payload;
        },
        setUsers: (state, action) => {
            const currentOther = state.users.users;

            state.users = {
                ...action.payload,
                users: [...currentOther, ...action.payload?.users]
            };
        },
        setUser: (state, action) => {

        },
        setDataAdmin: () => initialState
    }
});

export const {
    setUsersIsLoading,
    initUsers,
    setUsers,
    setUser,
    setDataAdmin
} = adminSlice.actions;

export default adminSlice.reducer;
