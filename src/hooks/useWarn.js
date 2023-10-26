import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { requestDataIsError } from '../utils/requestDataIsError';

import { initWarns, setWarns, setWarnsIsLoading } from '../redux/slices/warn';

import useRequest from './useRequest';
import useError from './useError';
import useAlert from './useAlert';

const useWarn = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {warns} = useSelector(state => state.warn);
    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useAlert();
    const dispatch = useDispatch();

    const loadWarns = async (offset = 0, limit = 6, reload = false) => {
        setError(false);

        if(!warns.complaints || reload){
            dispatch(setWarnsIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, `/complaint/task?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setWarnsIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => loadWarns(offset, limit, reload));
            }
            
            dispatch(initWarns(response.data));
        }
    }

    const getAllWarns = async (offset = 0, limit = 6) => {
        setError(false);

        if(!warns?.complaints || warns?.complaints?.length + 1 < offset + limit){
            const response = await request(REQUEST_TYPE.ADMIN, `/complaint/task?offset=${warns?.complaints?.length}&limit=${limit}`, HTTP_METHODS.GET, true);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllWarns(warns?.complaints?.length, limit));
            }
            
            dispatch(setWarns(response.data));
        }
    }

    const warnTask = async (targetId, description, successCallback = () => {}) => {
        setError(false);

        if(!description){
            return alertNotify("Предупреждение", "Описание проблемы не может быть пустым", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.EMPTY, "/complaint/task", HTTP_METHODS.POST, true, {
            targetId,
            description
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => warnTask(targetId, description, successCallback));
        }

        let message = `Жалоба отправлена. На сегодня осталось жалоб: ${response?.data?.complaintsRemaining || 0}`;
        if(response?.data?.complaintsRemaining === 0){
            message = "Жалоба отправлена. Вы исчерпали лимит жалоб на сегодня";
        }

        alertNotify("Успешно", message, "success");
        successCallback();
    }

    return{
        isLoading,
        error,
        loadWarns,
        getAllWarns,
        warnTask
    }
}

export default useWarn;