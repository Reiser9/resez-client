import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';

import { initUsers, setUsers, setUsersIsLoading } from '../redux/slices/admin';

import useRequest from './useRequest';
import useError from './useError';
import useAlert from './useAlert';

const useAdmin = () => {
    const [error, setError] = React.useState(false);
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
        
        alertNotify("Успешно", "Пользователь заблокирован", "success");
        successCallback();
        console.log(response);
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
        
        alertNotify("Успешно", "Пользователь разблокирован", "success");
        successCallback();
    }

    return {
        error,
        userIsLoading,
        loadUsers,
        getAllUsers,
        userBlock,
        userUnblock
    }
}

export default useAdmin;