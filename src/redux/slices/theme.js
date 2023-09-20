import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    themesIsLoading: false,
    themes: {}
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
        setThemes: (state, action) => {
            const currentThemes = state.themes.themes;

            state.themes = {
                ...action.payload,
                themes: currentThemes ? [...currentThemes, ...action.payload] : [...action.payload]
            };
        },
        setDataTheme: (state) => {
            state.themesIsLoading = false;
            state.themes = {};
        }
    }
});

export const {
    setMode,
    initThemes,
    setThemes,
    setDataTheme
} = themeSlice.actions;

export default themeSlice.reducer;
