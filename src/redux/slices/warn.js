import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    warnsIsLoading: false,
    warns: []
};

export const warnSlice = createSlice({
    name: 'warn',
    initialState,
    reducers: {
        setWarnsIsLoading: (state, action) => {
            state.warnsIsLoading = action.payload;
        },
        initWarns: (state, action) => {
            state.warns = action.payload;
        },
        setWarns: (state, action) => {
            const currentWarns = state.warns.complaints;

            state.warns = {
                ...action.payload,
                complaints: currentWarns ? [...currentWarns, ...action.payload.complaints] : [...action.payload.complaints]
            };
        },
        setDataWarn: () => initialState
    }
});

export const {
    setWarnsIsLoading,
    initWarns,
    setWarns,
    setDataWarn
} = warnSlice.actions;

export default warnSlice.reducer;
