import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    collectionIsLoading: false,
    collections: [],
    collection: {}
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setCollectionIsLoading: (state, action) => {
            state.collectionIsLoading = action.payload
        },
        initCollections: (state, action) => {
            state.collections = action.payload
        },
        setCollections: (state, action) => {
            const currentCollections = state.collections.collections;

            state.collections = {
                ...action.payload,
                collections: [...currentCollections, ...action.payload.collections]
            };
        },
        initCollection: (state, action) => {
            state.collection = action.payload
        },
        addCollection: (state, action) => {
            state.collections.collections = [action.payload, ...state.collections.collections];
            state.collections.totalCount++;
        },
        removeCollection: (state, action) => {
            state.collections.collections = state.collections.collections.filter(obj => obj.id !== action.payload.id);
            state.collections.totalCount--;
        },
        setDataTraining: () => initialState
    }
});

export const {
    setCollectionIsLoading,
    initCollections,
    setCollections,
    initCollection,
    addCollection,
    removeCollection,
    setDataTraining
} = trainingSlice.actions;

export default trainingSlice.reducer;
