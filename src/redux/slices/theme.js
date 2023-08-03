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
        addNewTheme: (state, action) => {
            state.themes = state.themes.length > 0 ? [...state.themes, action.payload] : [];
        },
        deleteTheme: (state, action) => {
            state.themes = state.themes.filter((item) => item.id !== action.payload.id);
        },
        setDataTheme: () => initialState
    }
});

export const {
    setMode,
    initThemes,
    setDataTheme,
    addNewTheme,
    deleteTheme
} = themeSlice.actions;

export default themeSlice.reducer;
