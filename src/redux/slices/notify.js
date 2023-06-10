import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notify: []
};

export const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        addNotify: (state, action) => {
            state.notify = state.notify.concat(action.payload);
        },
        removeNotify: (state, action) => {
            state.notify = state.notify.filter(item => item.id !== action.payload);
        }
    }
});

export const {
    addNotify,
    removeNotify
} = notifySlice.actions;

export default notifySlice.reducer;
