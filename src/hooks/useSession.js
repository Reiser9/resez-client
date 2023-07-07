import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { APP_STATUSES } from '../consts/APP_STATUSES';

import {requestDataIsError} from '../utils/requestDataIsError';

import useRequest from "./useRequest";
import useNotify from './useNotify';

import { setSessionsIsLoading, initSessions } from '../redux/slices/session';

const useSession = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {sessions} = useSelector(state => state.session);

    const dispatch = useDispatch();
    const {request, noAuthController} = useRequest();
    const {alertNotify} = useNotify();

    const getAllSessions = async (page = 1, limit = 5) => {
        setError(false);

        if(!sessions?.other || sessions?.other?.length + 1 < page * limit){
            setIsLoading(true);
            dispatch(setSessionsIsLoading(true));

            const response = await request(REQUEST_TYPE.SESSION, `?page=${page}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);
            dispatch(setSessionsIsLoading(false));

            if(requestDataIsError(response)){
                switch(response){
                    case APP_STATUSES.SERVER_NOT_AVAILABLE:
                        return;
                    case APP_STATUSES.NOT_AUTH:
                        return noAuthController(() => getAllSessions(page, limit));
                    default:
                        return alertNotify("Ошибка", response.data.message, "error");
                }
            }
            
            dispatch(initSessions(response.data));
        }
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
                    return noAuthController(endAllSessions);
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        alertNotify("Успешно", "Все сессии, кроме текущей, завершены", "success");
    }

    const endSession = async (id) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.SESSION, `/end/${id}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => endSession(id));
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        alertNotify("Успешно", "Сессия завершена", "success");
    }

    return {
        isLoading,
        error,
        getAllSessions,
        endAllSessions,
        endSession
    }
}

export default useSession;