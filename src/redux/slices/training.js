import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    collectionsIsLoading: false,
    collections: {},
    collection: {}
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setCollectionsIsLoading: (state, action) => {
            state.collectionsIsLoading = action.payload
        },
        initCollections: (state, action) => {
            state.collections = action.payload
        },
        setCollections: (state, action) => {
            const currentCollections = state.collections.collections;

            state.collections = {
                ...action.payload,
                collections: currentCollections ? [...currentCollections, ...action.payload] : [...action.payload]
            };
        },
        initCollection: (state, action) => {
            state.collection = action.payload
        },
        addCollection: (state, action) => {
            const currentCollections = state.collections?.collections;

            if(!currentCollections){
                return;
            }

            state.collections = {
                ...state.collections,
                collections: [action.payload, ...currentCollections],
                totalCount: state.collections.totalCount + 1,
            };
        },
        editCollection: (state, action) => {
            const index = state.collections?.collections?.findIndex(obj => obj.id === action.payload.id);

            if(index !== -1){
                state.collections?.collections?.splice(index, 1, action.payload);
            }
        },
        removeCollection: (state, action) => {
            state.collections.collections = state.collections.collections.filter(obj => obj.id !== action.payload.id);
            state.collections.totalCount--;
        },
        setDataTraining: () => initialState
    }
});

export const {
    setCollectionsIsLoading,
    initCollections,
    setCollections,
    initCollection,
    addCollection,
    editCollection,
    removeCollection,
    setDataTraining
} = trainingSlice.actions;

export default trainingSlice.reducer;
