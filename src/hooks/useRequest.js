import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {HTTP_METHODS, REQUEST_TYPE} from '../consts/HTTP';
import {APP_STATUSES} from '../consts/APP_STATUSES';
import {
    authRequest,
    emptyRequest,
    sessionRequest,
    themeRequest,
    userRequest,
    adminRequest,
    collectionRequest,
    notifyRequest
} from '../consts/AXIOS';

import { setDataUser } from '../redux/slices/user';
import { setDataAuth, setIsAuth } from '../redux/slices/auth';
import { setDataApp } from '../redux/slices/app';
import { setServerAvailable } from '../redux/slices/server';
import { setDataSession } from '../redux/slices/session';
import { setDataNotify } from '../redux/slices/notify';
import { setDataTheme } from '../redux/slices/theme';
import { setDataAdmin } from '../redux/slices/admin';
import { setDataTraining } from '../redux/slices/training';

import { requestDataIsError } from '../utils/requestDataIsError';
import { setMainColors } from '../utils/setMainColors';
import { socket } from '../utils/socket';

const useRequest = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();
    const {user, sessionId} = useSelector(state => state.user);

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.USER, userRequest],
        [REQUEST_TYPE.SESSION, sessionRequest],
        [REQUEST_TYPE.THEME, themeRequest],
        [REQUEST_TYPE.NOTIFY, notifyRequest],
        [REQUEST_TYPE.ADMIN, adminRequest],
        [REQUEST_TYPE.COLLECTION, collectionRequest],
        [REQUEST_TYPE.EMPTY, emptyRequest]
    ]);

    const clearLocalData = () => {
        if(Object.keys(user).length !== 0 && sessionId){
            socket.emit("leave", user.id, sessionId);
        }

        localStorage.removeItem("accessToken");

        dispatch(setDataUser());
        dispatch(setDataAuth());
        dispatch(setDataApp());
        dispatch(setDataSession());
        dispatch(setDataNotify());
        dispatch(setDataTheme());
        dispatch(setDataAdmin());
        dispatch(setDataTraining());

        setMainColors();

        dispatch(setIsAuth(false));
    }

    const newTokens = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/refresh", HTTP_METHODS.GET);

        setIsLoading(false);

        if(requestDataIsError(response)){
            return setError(true);
        }

        return response.data;
    }

    const noAuthController = async (callback = () => {}) => {
        setIsLoading(true);

        const tokens = await newTokens();

        setIsLoading(false);

        if(!tokens){
            return clearLocalData();
        }

        localStorage.setItem("accessToken", tokens.accessToken);

        return callback();
    }

    const getHealthServer = async () => {
        try{
            dispatch(setServerAvailable(true));

            await emptyRequest.get("/health", {
                timeout: 3000
            });

            return true;
        }catch(error){
            dispatch(setServerAvailable(false));

            return false;
        }
    }

    const request = async (
        requestType = REQUEST_TYPE.USER,
        url,
        method = HTTP_METHODS.GET,
        isAuth = false,
        data = {},
        headers = {}
    ) => {
        setError(false);
        setIsLoading(true);

        const accessToken = localStorage.getItem("accessToken");

        const axiosInstance = axiosInstancesMap.get(requestType);

        let reqHeaders = {
            'Content-Type': 'application/json',
            ...headers
        }

        if(isAuth){
            reqHeaders = {
                ...reqHeaders,
                'Authorization': `Bearer ${accessToken}`
            }
        }

        try{
            const response = await axiosInstance.request({
                method,
                url,
                headers: reqHeaders,
                data
            });

            setIsLoading(false);

            return response;
        }
        catch(err){
            setError(true);
            setIsLoading(false);

            if(err?.response?.status === 429){
                return APP_STATUSES.TOO_MANY_REQUESTS;
            }

            const serverHealth = await getHealthServer();

            if(!serverHealth){
                return APP_STATUSES.SERVER_NOT_AVAILABLE;
            }

            if(err?.response?.status === 401){
                return APP_STATUSES.NOT_AUTH;
            }

            if(err?.response?.status === 403){
                return APP_STATUSES.YOUR_BLOCKED;
            }

            return err.response;
        }
    };

    return {
        isLoading,
        error,
        request,
        getHealthServer,
        noAuthController,
        clearLocalData
    };
}

export default useRequest;