import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { initUser } from '../redux/slices/user';

import useRequest from './useRequest';
import { setIsAuth } from '../redux/slices/auth';

const useUser = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request} = useRequest();

    const getShortInfo = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/short-info", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(response?.data?.error){
            return setError(true);
        }

        dispatch(setIsAuth(true));
        dispatch(initUser(response));

        return response;
    }

    return {
        isLoading,
        error,
        getShortInfo
    }
}

export default useUser;