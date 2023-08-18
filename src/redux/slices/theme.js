import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    themesIsLoading: false,
    themes: []
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setThemesIsLoading: (state, action) => {
            state.themesIsLoading = action.payload;
        },
        initThemes: (state, action) => {
            state.themes = action.payload;
        },
        setThemes: (state, action) => {
            const currentThemes = state.themes.themes;

            state.themes = {
                ...action.payload,
                themes: [...currentThemes, ...action.payload?.themes]
            };
        },
        addNewTheme: (state, action) => {
            state.themes.themes = state.themes?.themes?.length > 0 ? [...state.themes.themes, action.payload] : [];
            state.themes.totalCount++;
        },
        changeTheme: (state, action) => {
            state.themes.themes = state.themes.themes.map((obj) => {
                if(obj.id == action.payload.id){
                    return action.payload.theme;
                }

                return obj;
            });
        },
        deleteTheme: (state, action) => {
            state.themes.themes = state.themes?.themes?.filter((item) => item.id !== action.payload.id);
            state.themes.totalCount--;
        },
        setDataTheme: () => initialState
    }
});

export const {
    setMode,
    setThemesIsLoading,
    initThemes,
    setDataTheme,
    setThemes,
    addNewTheme,
    changeTheme,
    deleteTheme
} = themeSlice.actions;

export default themeSlice.reducer;
