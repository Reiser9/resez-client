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
            const currentOther = state.users.users;

            state.users = {
                ...action.payload,
                users: [...currentOther, ...action.payload?.users]
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
                themes: [...currentThemes, ...action.payload?.themes]
            };
        },
        addNewTheme: (state, action) => {
            state.themes.themes = [...state.themes.themes, action.payload];
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
