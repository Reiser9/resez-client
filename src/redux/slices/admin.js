import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    adminStats: {},
    usersIsLoading: false,
    users: [],
    themesIsLoading: false,
    themes: [],
    subjectsIsLoading: false,
    subjects: [],
    tasksIsLoading: false,
    tasks: [],
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Статистика
        setAdminStats: (state, action) => {
            state.adminStats = action.payload;
        },
        // Пользователи
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
        // Темы
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
            state.themes.themes = state.themes?.themes?.filter(item => item.id !== action.payload.id);
            state.themes.totalCount--;
        },
        // Предметы
        setSubjectsIsLoading: (state, action) => {
            state.subjectsIsLoading = action.payload;
        },
        initSubjects: (state, action) => {
            state.subjects = action.payload;
        },
        addNewSubject: (state, action) => {
            const currentSubjects = state.subjects.subjects;

            if(!currentSubjects){
                return;
            }

            state.subjects = {
                ...state.subjects,
                subjects: [...currentSubjects, action.payload],
                totalCount: state.subjects.totalCount + 1
            };
        },
        changeSubject: (state, action) => {
            const index = state.subjects?.subjects?.findIndex(obj => obj.id === action.payload.id);

            if(index !== -1){
                state.subjects?.subjects?.splice(index, 1, action.payload);
            }
        },
        deleteSubject: (state, action) => {
            state.subjects.subjects = state.subjects?.subjects?.filter(item => item.id !== action.payload.id);
            state.subjects.totalCount--;
        },
        // Задания
        setTasksIsLoading: (state, action) => {
            state.tasksIsLoading = action.payload;
        },
        initTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setTasks: (state, action) => {
            const currentTasks = state.tasks.tasks;

            state.tasks = {
                ...action.payload,
                tasks: currentTasks ? [...currentTasks, ...action.payload.tasks] : [...action.payload.tasks]
            };
        },
        addNewTask: (state, action) => {
            const currentTasks = state.tasks.tasks;

            if(!currentTasks){
                return;
            }

            state.tasks = {
                ...state.tasks,
                tasks: [...currentTasks, action.payload],
                totalCount: state.tasks.totalCount + 1
            };
        },
        deleteTask: (state, action) => {
            state.tasks.tasks = state.tasks?.tasks?.filter(item => item.id !== action.payload.id);
            state.tasks.totalCount--;
        },
        setDataAdmin: () => initialState
    }
});

export const {
    setAdminStats,
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
    setSubjectsIsLoading,
    initSubjects,
    addNewSubject,
    changeSubject,
    deleteSubject,
    setTasksIsLoading,
    initTasks,
    setTasks,
    addNewTask,
    deleteTask,
    setDataAdmin
} = adminSlice.actions;

export default adminSlice.reducer;
