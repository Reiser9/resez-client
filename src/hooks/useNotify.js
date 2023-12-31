import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import {initNotifies, readNotifyById, setNotifies, setNotifiesIsLoading} from '../redux/slices/notify';
import { decrementUreadNotifyCount, setUreadNotifyCount } from '../redux/slices/user';

import { requestDataIsError } from '../utils/requestDataIsError';

import useRequest from './useRequest';
import useError from './useError';
import useAlert from './useAlert';

const useNotify = () => {
    const [error, setError] = React.useState(false);
    const [notifyIsLoading, setNotifyIsLoading] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();
    const {notifies} = useSelector(state => state.notify);
    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useAlert();

    const loadNotify = async (offset = 0, limit = 5, unread = false) => {
        setError(false);

        dispatch(setNotifiesIsLoading(true));

        const response = await request(REQUEST_TYPE.NOTIFY, `?offset=${offset}&limit=${limit}&unread=${unread}`, HTTP_METHODS.GET, true);

        dispatch(setNotifiesIsLoading(false));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => loadNotify(offset, limit, unread));
        }
        
        dispatch(initNotifies(response.data));
    }

    const getAllNotify = async (offset = 0, limit = 5, unread = false) => {
        setError(false);

        if(!notifies?.notifies || notifies?.notifies?.length + 1 < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.NOTIFY, `?offset=${offset}&limit=${limit}&unread=${unread}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllNotify(offset, limit, unread));
            }

            dispatch(setNotifies(response.data));
        }
    }

    const readNotify = async (notifyId) => {
        setError(false);

        setNotifyIsLoading(prev => [...prev, notifyId]);

        const response = await request(REQUEST_TYPE.NOTIFY, `/read`, HTTP_METHODS.PUT, true, {
            notifyId
        });

        setNotifyIsLoading(prev => prev.filter(item => item !== notifyId));

        if(requestDataIsError(response)){
            return errorController(response, () => readNotify(notifyId));
        }

        dispatch(readNotifyById(response.data.notify));
        dispatch(decrementUreadNotifyCount());
    }

    const readAllNotifies = async (offset = 0, limit = 6, unread = false) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.NOTIFY, `/read-all?offset=${offset}&limit=${limit}`, HTTP_METHODS.PUT, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => readAllNotifies(offset, limit));
        }

        alertNotify("Успешно", "Все сообщения прочитаны", "success");

        dispatch(setUreadNotifyCount(0));
        if(unread){
            dispatch(initNotifies({
                notifies: [],
                totalCount: 0,
                isLast: true,
                elementsCount: 0
            }));
        }
        else{
            dispatch(initNotifies(response.data));
        }
    }

    return {
        isLoading,
        notifyIsLoading,
        error,
        alertNotify,
        loadNotify,
        getAllNotify,
        readNotify,
        readAllNotifies
    };
}

export default useNotify;