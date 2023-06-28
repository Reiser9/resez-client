import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { APP_STATUSES } from '../consts/APP_STATUSES';

import useRequest from './useRequest';
import useNotify from './useNotify';

import { requestDataIsError } from '../utils/requestDataIsError';

const useUser = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useNotify();

    const getShortInfo = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/short-info", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        return response;
    }

    return {
        isLoading,
        error,
        getShortInfo
    }
}

export default useUser;