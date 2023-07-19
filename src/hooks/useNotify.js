import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { APP_STATUSES } from '../consts/APP_STATUSES';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import {addNotify, changeUnreadCount, decrementUnreadCount, initNotifies, readNotifyById, setNotifies, setNotifiesIsLoading} from '../redux/slices/notify';

import { requestDataIsError } from '../utils/requestDataIsError';

import useRequest from './useRequest';


const useNotify = () => {
    const [notifyIsLoading, setNotifyIsLoading] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {notifiesLocal, notifies} = useSelector(state => state.notify);
    const {noAuthController, request} = useRequest();

    const alertNotify = (title, text, type = "success", time = 2000) => {
        if(notifiesLocal.length >= 3){
            return;
        }

        const idNotify = new Date().getTime();

        const notifyObject = {
            id: idNotify,
            title,
            text,
            type,
            time
        }

        dispatch(addNotify(notifyObject));
    }

    const loadNotify = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!notifies?.notifies || reload){
            dispatch(setNotifiesIsLoading(true));

            const response = await request(REQUEST_TYPE.NOTIFY, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setNotifiesIsLoading(false));

            if(requestDataIsError(response)){
                switch(response){
                    case APP_STATUSES.SERVER_NOT_AVAILABLE:
                        return;
                    case APP_STATUSES.NOT_AUTH:
                        return noAuthController(() => loadNotify(offset, limit, reload));
                    default:
                        return alertNotify("Ошибка", response?.data?.message, "error");
                }
            }
            
            dispatch(initNotifies(response.data));
        }
    }

    const getAllNotify = async (offset = 0, limit = 5) => {
        setError(false);

        if(!notifies?.notifies || notifies?.notifies?.length + 1 < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.NOTIFY, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                switch(response){
                    case APP_STATUSES.SERVER_NOT_AVAILABLE:
                        return;
                    case APP_STATUSES.NOT_AUTH:
                        return noAuthController(() => getAllNotify(offset, limit));
                    default:
                        return alertNotify("Ошибка", response?.data?.message, "error");
                }
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
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => readNotify(notifyId));
                default:
                    return alertNotify("Ошибка", response?.data?.message, "error");
            }
        }
        
        alertNotify("Успешно", "Сообщение прочитано", "success");
        dispatch(readNotifyById(response.data));
        dispatch(decrementUnreadCount());
    }

    const readAllNotifies = async (offset = 0, limit = 6) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.NOTIFY, `/read-all?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => readAllNotifies());
                default:
                    return alertNotify("Ошибка", response?.data?.message, "error");
            }
        }

        alertNotify("Успешно", "Все сообщения прочитаны", "success");
        dispatch(initNotifies(response.data));
        dispatch(changeUnreadCount(0));
    }

    const getUnreadNotifiesCount = async () => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.NOTIFY, `/unread-count`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => getUnreadNotifiesCount());
                default:
                    return alertNotify("Ошибка", response?.data?.message, "error");
            }
        }

        dispatch(changeUnreadCount(response.data));
    }

    return {
        isLoading,
        notifyIsLoading,
        error,
        alertNotify,
        loadNotify,
        getAllNotify,
        readNotify,
        readAllNotifies,
        getUnreadNotifiesCount
    };
}

export default useNotify;