import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    themes: []
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        initThemes: (state, action) => {
            state.themes = action.payload;
        },
        setDataTheme: () => initialState
    }
});

export const {
    setMode,
    initThemes,
    setDataTheme
} = themeSlice.actions;

export default themeSlice.reducer;
