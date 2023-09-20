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
    setPermissionsIsLoading,
    initPermissions,
    setDataRole
} = roleSlice.actions;

export default roleSlice.reducer;