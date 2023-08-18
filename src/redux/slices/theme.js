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
            state.themes.themes = state.themes?.themes?.length > 0 ? [...state.themes.themes, action.payload] : [];
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
        },
        setDataTheme: () => initialState
    }
});

export const {
    setMode,
    initThemes,
    setDataTheme,
    addNewTheme,
    changeTheme,
    deleteTheme
} = themeSlice.actions;

export default themeSlice.reducer;
