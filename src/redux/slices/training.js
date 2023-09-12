import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    collections: [],
    collection: {}
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        initCollections: (state, action) => {
            state.collections = action.payload
        },
        initCollection: (state, action) => {
            state.collection = action.payload
        },
        setDataTraining: () => initialState
    }
});

export const {
    initCollections,
    initCollection,
    setDataTraining
} = trainingSlice.actions;

export default trainingSlice.reducer;
