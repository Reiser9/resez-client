import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    usersIsLoading: false,
    users: [],
    themesIsLoading: false,
    themes: []
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsersIsLoading: (state, action) => {
            state.usersIsLoading = action.payload;
        },
        initUsers: (state, action) => {
            state.users = action.payload;
        },
        setUsers: (state, action) => {
            const currentUsers = state.users.users;

            state.users = {
                ...action.payload,
                users: currentUsers ? [...currentUsers, ...action.payload.users] : [...action.payload.users]
            };
        },
        setUser: (state, action) => {
            const index = state.users?.users?.findIndex(obj => obj.id === action.payload.id);

            if(index !== -1){
                state.users?.users?.splice(index, 1, action.payload);
            }
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
                themes: currentThemes ? [...currentThemes, ...action.payload.themes] : [...action.payload.themes]
            };
        },
        addNewTheme: (state, action) => {
            const currentThemes = state.themes.themes;

            if(!currentThemes){
                return;
            }

            state.themes = {
                ...state.themes,
                themes: [...currentThemes, action.payload],
                totalCount: state.themes.totalCount + 1
            };
        },
        changeTheme: (state, action) => {
            const index = state.themes?.themes?.findIndex(obj => obj.id === action.payload.id);

            if(index !== -1){
                state.themes?.themes?.splice(index, 1, action.payload);
            }
        },
        deleteTheme: (state, action) => {
            state.themes.themes = state.themes?.themes?.filter((item) => item.id !== action.payload.id);
            state.themes.totalCount--;
        },
        setDataAdmin: () => initialState
    }
});

export const {
    setUsersIsLoading,
    initUsers,
    setUsers,
    setUser,
    setThemesIsLoading,
    initThemes,
    setThemes,
    addNewTheme,
    changeTheme,
    deleteTheme,
    setDataAdmin
} = adminSlice.actions;

export default adminSlice.reducer;
