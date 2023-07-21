import React from 'react';
import {useDispatch} from 'react-redux';

import {HTTP_METHODS, REQUEST_TYPE} from '../consts/HTTP';
import {APP_STATUSES} from '../consts/APP_STATUSES';
import {
    authRequest,
    emptyRequest,
    sessionRequest,
    themeRequest,
    userRequest,
    notifyRequest
} from '../consts/AXIOS';

import { setDataUser } from '../redux/slices/user';
import { setDataAuth, setIsAuth } from '../redux/slices/auth';
import { setDataApp } from '../redux/slices/app';
import { setServerAvailable } from '../redux/slices/server';
import { setDataSession } from '../redux/slices/session';
import { setDataNotify } from '../redux/slices/notify';
import { setDataTheme } from '../redux/slices/theme';

import { requestDataIsError } from '../utils/requestDataIsError';
import { setMainColors } from '../utils/setMainColors';

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.USER, userRequest],
        [REQUEST_TYPE.SESSION, sessionRequest],
        [REQUEST_TYPE.THEME, themeRequest],
        [REQUEST_TYPE.NOTIFY, notifyRequest],
        [REQUEST_TYPE.EMPTY, emptyRequest]
    ]);

    const clearLocalData = () => {
        localStorage.removeItem("accessToken");

        dispatch(setDataUser());
        dispatch(setDataAuth());
        dispatch(setDataApp());
        dispatch(setDataSession());
        dispatch(setDataNotify());
        dispatch(setDataTheme());

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

            const serverHealth = await getHealthServer();

            if(!serverHealth){
                return APP_STATUSES.SERVER_NOT_AVAILABLE;
            }

            if(err.response.status === 429){
                return APP_STATUSES.TOO_MANY_REQUESTS;
            }

            if(err.response.status === 401){
                return APP_STATUSES.NOT_AUTH;
            }

            // if(){
            //     return APP_STATUSES.YOUR_BLOCKED;
            // }

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