import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';

import { initUsers, setUser, setUsers, setUsersIsLoading } from '../redux/slices/admin';
import { addNewTheme, deleteTheme } from '../redux/slices/theme';

import useRequest from './useRequest';
import useError from './useError';
import useAlert from './useAlert';

const useAdmin = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [userIsLoading, setUserIsLoading] = React.useState([]);

    const dispatch = useDispatch();
    const {users} = useSelector(state => state.admin);

    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useAlert();

    const loadUsers = async (offset = 0, limit = 6) => {
        setError(false);

        dispatch(setUsersIsLoading(true));

        const response = await request(REQUEST_TYPE.USER, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

        dispatch(setUsersIsLoading(false));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => loadUsers(offset, limit));
        }
        
        dispatch(initUsers(response.data));
    }

    const getAllUsers = async (offset = 0, limit = 6) => {
        setError(false);

        if(!users?.users || users?.users?.length + 1 < offset + limit){
            const response = await request(REQUEST_TYPE.USER, `?offset=${users?.users?.length}&limit=${limit}`, HTTP_METHODS.GET, true);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllUsers(users?.users?.length, limit));
            }
            
            dispatch(setUsers(response.data));
        }
    }

    const userBlock = async (userId, successCallback = () => {}) => {
        setError(false);

        setUserIsLoading(prev => [...prev, userId]);

        const response = await request(REQUEST_TYPE.USER, "/block", HTTP_METHODS.PUT, true, {
            userId
        });

        setUserIsLoading(prev => prev.filter(item => item !== userId));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => userBlock(userId, successCallback));
        }
        
        dispatch(setUser(response.data.user));
        alertNotify("Успешно", "Пользователь заблокирован", "success");
        successCallback();
    }

    const userUnblock = async (userId, successCallback = () => {}) => {
        setError(false);

        setUserIsLoading(prev => [...prev, userId]);

        const response = await request(REQUEST_TYPE.USER, "/unblock", HTTP_METHODS.PUT, true, {
            userId
        });

        setUserIsLoading(prev => prev.filter(item => item !== userId));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => userBlock(userId, successCallback));
        }
        
        dispatch(setUser(response.data.user));
        alertNotify("Успешно", "Пользователь разблокирован", "success");
        successCallback();
    }

    const createTheme = async (primary, light, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.THEME, "", HTTP_METHODS.POST, true, {
            primary,
            light
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => createTheme(primary, light, successCallback));
        }

        dispatch(addNewTheme(response.data.theme));
        alertNotify("Успешно", "Тема создана", "success");
        successCallback();
    }

    const removeTheme = async (id, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.THEME, "", HTTP_METHODS.DELETE, true, {
            id
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => removeTheme(id, successCallback));
        }

        dispatch(deleteTheme(response.data.theme));
        alertNotify("Успешно", "Тема удалена", "success");
        successCallback();
    }

    return {
        error,
        isLoading,
        userIsLoading,
        loadUsers,
        getAllUsers,
        userBlock,
        userUnblock,
        createTheme,
        removeTheme
    }
}

export default useAdmin;