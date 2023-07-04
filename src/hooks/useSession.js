import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { APP_STATUSES } from '../consts/APP_STATUSES';

import {requestDataIsError} from '../utils/requestDataIsError';

import useRequest from "./useRequest";
import useNotify from './useNotify';

import { initSessions } from '../redux/slices/session';

const useSession = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useNotify();

    const getAllSessions = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.SESSION, "", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }
        
        dispatch(initSessions(response.data));
    }

    const endAllSessions = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.SESSION, "/end-all", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        alertNotify("Успешно", "Все сессии, кроме текущей, завершены", "success");
    }

    return {
        isLoading,
        error,
        getAllSessions,
        endAllSessions
    }
}

export default useSession;