import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    collections: []
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        initCollections: (state, action) => {
            state.collections = action.payload
        },
        setDataTraining: () => initialState
    }
});

export const {
    setDataTraining,
    initCollections
} = trainingSlice.actions;

export default trainingSlice.reducer;
