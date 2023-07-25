import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import {requestDataIsError} from '../utils/requestDataIsError';

import useRequest from "./useRequest";
import useNotify from './useNotify';
import useError from './useError';

import { setSessionsIsLoading, initSessions, setSessions, endSessionById } from '../redux/slices/session';

const useSession = () => {
    const [sessionIsLoading, setSessionIsLoading] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {sessions} = useSelector(state => state.session);

    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useNotify();
    const {errorController} = useError();

    const loadSessions = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!sessions?.other || reload){
            dispatch(setSessionsIsLoading(true));

            const response = await request(REQUEST_TYPE.SESSION, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setSessionsIsLoading(false));

            if(requestDataIsError(response)){
                debugger;
                setError(true);

                return errorController(response, () => loadSessions(offset, limit, reload));
            }
            
            dispatch(initSessions(response.data));
        }
    }

    const getAllSessions = async (offset = 0, limit = 5) => {
        setError(false);

        if(!sessions?.other || sessions?.other?.length + 1 < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.SESSION, `?offset=${sessions?.other?.length}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllSessions(sessions?.other?.length, limit));
            }
            
            dispatch(setSessions(response.data));
        }
    }

    const endAllSessions = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.SESSION, "/end-all", HTTP_METHODS.PUT, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, endAllSessions);
        }

        alertNotify("Успешно", "Все сеансы, кроме текущего, завершены", "success");
        dispatch(initSessions(response.data));
    }

    const endSession = async (id) => {
        setError(false);
        setIsLoading(true);
        setSessionIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.SESSION, `/end/${id}`, HTTP_METHODS.PUT, true);

        setSessionIsLoading(prev => prev.filter(item => item !== id));
        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => endSession(id));
        }

        alertNotify("Успешно", "Сеанс завершен", "success");
        dispatch(endSessionById(response.data.session));
    }

    return {
        sessionIsLoading,
        isLoading,
        error,
        loadSessions,
        getAllSessions,
        endAllSessions,
        endSession
    }
}

export default useSession;