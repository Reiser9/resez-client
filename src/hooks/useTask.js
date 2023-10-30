import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from "../consts/HTTP";

import { requestDataIsError } from '../utils/requestDataIsError';

import { initTask, initTasks, setTaskIsLoading } from '../redux/slices/task';

import useRequest from './useRequest';
import useError from './useError';
import useAlert from './useAlert';

const useTask = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const {alertNotify} = useAlert();
    const {request} = useRequest();
    const {errorController} = useError();
    const dispatch = useDispatch();

    const getTasksBySubthemeId = async (id, errorCallback = () => {}) => {
        setError(false);

        dispatch(setTaskIsLoading(true));

        const response = await request(REQUEST_TYPE.EMPTY, `/sub-theme/${id}/tasks`, HTTP_METHODS.GET);

        dispatch(setTaskIsLoading(false));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => {}, "", () => {
                errorCallback();
                alertNotify("Ошибка", response?.data?.message || "Заданий не найдено", "error");
            });
        }

        dispatch(initTasks(response.data));
    }

    const getTaskById = async (id, errorCallback = () => {}) => {
        setError(false);

        dispatch(setTaskIsLoading(true));

        const response = await request(REQUEST_TYPE.EMPTY, `/task/${id}`, HTTP_METHODS.GET);

        dispatch(setTaskIsLoading(false));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => {}, "", () => {
                errorCallback();
                alertNotify("Ошибка", response?.data?.message || "Задание не найдено", "error");
            });
        }

        dispatch(initTasks(response.data));
    }

    return{
        error,
        isLoading,
        getTasksBySubthemeId,
        getTaskById
    }
}

export default useTask;