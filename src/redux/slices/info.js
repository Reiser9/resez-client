import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tableIsLoading: false,
    tableInfo: {}
};

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setTableIsLoading: (state, action) => {
            state.tableIsLoading = action.payload;
        },
        initTableScore: (state, action) => {
            state.tableInfo = action.payload;
        },
        setDataInfo: () => initialState
    }
});

export const {
    setTableIsLoading,
    initTableScore,
    setDataInfo
} = infoSlice.actions;

export default infoSlice.reducer;
