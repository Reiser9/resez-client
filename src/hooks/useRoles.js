import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { requestDataIsError } from '../utils/requestDataIsError';

import { initPermissions, setPermissionsIsLoading, initRoles, setRolesIsLoading, setRoles, addNewRole, removeRole, editRole } from '../redux/slices/role';

import useRequest from './useRequest';
import useAlert from './useAlert';
import useError from './useError';

const useRoles = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [roleIsLoading, setRoleIsLoading] = React.useState([]);
    const [roleByIdIsLoading, setRoleByIdIsLoading] = React.useState(false);

    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useAlert();
    const dispatch = useDispatch();
    const {roles} = useSelector(state => state.role);

    const getAllPermissions = async () => {
        setError(false);

        dispatch(setPermissionsIsLoading(true));

        const response = await request(REQUEST_TYPE.ADMIN, "/permission", HTTP_METHODS.GET, true);

        dispatch(setPermissionsIsLoading(false));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, getAllPermissions);
        }

        dispatch(initPermissions(response.data.permissions));
    }

    const loadRoles = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!roles.roles || reload){
            dispatch(setRolesIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, `/role?offfset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setRolesIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => loadRoles(offset, limit, reload));
            }

            dispatch(initRoles(response.data));
        }
    }

    const getAllRoles = async (offset = 0, limit = 5) => {
        setError(false);

        if(roles?.roles?.length === 0 || roles?.roles?.length < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.ADMIN, `/role?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllRoles(offset, limit));
            }

            dispatch(setRoles(response.data));
        }
    }

    const getRoleById = async (id) => {
        setError(false);

        setRoleByIdIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, `/role/${id}`, HTTP_METHODS.GET, true);

        setRoleByIdIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => getRoleById(id));
        }

        return response.data.role;
    }

    const createRole = async (role, permissions = [], textColor, backgroundColor, successCallback = () => {}) => {
        setError(false);

        if(!role){
            return alertNotify("Предупреждение", "Название роли не может быть пустым", "warn");
        }
        else if(permissions.length === 0){
            return alertNotify("Предупреждение", "У роли должна быть хотя бы одна привилегия", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/role", HTTP_METHODS.POST, true, {
            role,
            permissions,
            textColor,
            backgroundColor
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => createRole(role, permissions, textColor, backgroundColor, successCallback));
        }

        dispatch(addNewRole(response.data.role));
        alertNotify("Успешно", "Роль создана", "success");
        successCallback();
    }

    const deleteRole = async (id) => {
        setError(false);

        setRoleIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.ADMIN, `/role/${id}`, HTTP_METHODS.DELETE, true);

        setRoleIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => deleteRole(id));
        }

        dispatch(removeRole(id));
        alertNotify("Успешно", "Роль удалена", "success");
    }

    const updateRole = async (id, role, permissions = [], textColor, backgroundColor, successCallback = () => {}) => {
        setError(false);

        if(!role){
            return alertNotify("Предупреждение", "Название роли не может быть пустым", "warn");
        }
        else if(permissions.length === 0){
            return alertNotify("Предупреждение", "У роли должна быть хотя бы одна привилегия", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/role", HTTP_METHODS.PUT, true, {
            id,
            role,
            permissions,
            textColor,
            backgroundColor
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => updateRole(id, role, permissions, textColor, backgroundColor, successCallback));
        }

        dispatch(editRole(response.data.role));
        alertNotify("Успешно", "Роль обновлена", "success");
        successCallback();
    }

    return{
        error,
        isLoading,
        roleIsLoading,
        roleByIdIsLoading,
        getAllPermissions,
        loadRoles,
        getAllRoles,
        getRoleById,
        createRole,
        deleteRole,
        updateRole
    }
}

export default useRoles;