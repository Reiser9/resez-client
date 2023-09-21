import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    rolesIsLoading: false,
    roles: {},
    permissionsIsLoading: false,
    permissions: []
};

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRolesIsLoading: (state, action) => {
            state.rolesIsLoading = action.payload
        },
        initRoles: (state, action) => {
            state.roles = action.payload
        },
        setRoles: (state, action) => {
            const currentRoles = state.roles.roles;

            state.roles = {
                ...action.payload,
                roles: currentRoles ? [...currentRoles, ...action.payload.roles] : [...action.payload.roles]
            };
        },
        addNewRole: (state, action) => {
            const currentRoles = state.roles?.roles;

            if(!currentRoles){
                return;
            }

            state.roles = {
                ...state.roles,
                roles: [action.payload, ...currentRoles],
                totalCount: state.roles.totalCount + 1,
            };
        },
        editRole: (state, action) => {
            const index = state.roles?.roles?.findIndex(obj => obj.id === action.payload.id);

            if(index !== -1){
                state.roles?.roles?.splice(index, 1, action.payload);
            }
        },
        removeRole: (state, action) => {
            state.roles.roles = state.roles.roles.filter(obj => obj.id !== action.payload);
            state.roles.totalCount--;
        },
        setPermissionsIsLoading: (state, action) => {
            state.permissionsIsLoading = action.payload
        },
        initPermissions: (state, action) => {
            state.permissions = action.payload
        },
        setDataRole: () => initialState
    }
});

export const {
    setRolesIsLoading,
    initRoles,
    setRoles,
    addNewRole,
    editRole,
    removeRole,
    setPermissionsIsLoading,
    initPermissions,
    setDataRole
} = roleSlice.actions;

export default roleSlice.reducer;