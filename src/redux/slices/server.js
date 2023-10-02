import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    serverAvailable: true,
    rooms: []
};

export const serverSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServerAvailable: (state, action) => {
            state.serverAvailable = action.payload;
        },
        setRooms: (state, action) => {
            state.rooms = action.payload;
        }
    }
});

export const {
    setServerAvailable,
    setRooms
} = serverSlice.actions;

export default serverSlice.reducer;
