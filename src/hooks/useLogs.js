import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { initLogs, setLogs, setLogsIsLoading } from '../redux/slices/log';

import { requestDataIsError } from '../utils/requestDataIsError';

import useRequest from './useRequest';
import useError from './useError';

const useLogs = () => {
    const [error, setError] = React.useState(false);
    const [loading, setIsLoading] = React.useState(false);
    const [logIsLoading, setLogIsLoading] = React.useState([]);

    const {request} = useRequest();
    const {errorController} = useError();
    const dispatch = useDispatch();
    const {logs} = useSelector(state => state.log);

    const loadLogs = async (offset = 0, limit = 5, userId = "", logTypeId = "", reload = false) => {
        setError(false);

        if(!logs.logs || reload){
            dispatch(setLogsIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, `/log?offset=${offset}&limit=${limit}&userId=${userId}&logTypeId=${logTypeId}`, HTTP_METHODS.GET, true);

            dispatch(setLogsIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => loadLogs(offset, limit, reload));
            }
            
            dispatch(initLogs(response.data));
        }
    }

    const getAllLogs = async (offset = 0, limit = 10) => {
        setError(false);

        if(!logs?.logs || logs?.logs?.length + 1 < offset + limit){
            const response = await request(REQUEST_TYPE.ADMIN, `/log?offset=${logs?.logs?.length}&limit=${limit}`, HTTP_METHODS.GET, true);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllLogs(logs?.logs?.length, limit));
            }
            
            dispatch(setLogs(response.data));
        }
    }

    return{
        error,
        loading,
        logIsLoading,
        loadLogs,
        getAllLogs
    }
}

export default useLogs;