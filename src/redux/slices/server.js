import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    serverAvailable: true
};

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServerAvailable: (state, action) => {
            state.serverAvailable = action.payload;
        }
    }
});

export const {
    setServerAvailable
} = serverSlice.actions;

export default serverSlice.reducer;
