import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import {BASE_API_URL_USER, BASE_API_URL_AUTH, BASE_API_URL_EMPTY} from '../consts/API_URLS';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import {setServerAvailable} from '../redux/slices/server';

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();

    const authRequest = axios.create({
        baseURL: BASE_API_URL_AUTH,
        withCredentials: true
    });

    const userRequest = axios.create({
        baseURL: BASE_API_URL_USER,
        withCredentials: true
    });

    const emptyRequest = axios.create({
        baseURL: BASE_API_URL_EMPTY,
        withCredentials: true
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.USER, userRequest],
        [REQUEST_TYPE.EMPTY, emptyRequest]
    ]);

    const getHealthServer = async () => {
        try{
            await emptyRequest.get("/health", {
                timeout: 5000
            });

            return true;
        }catch(error){
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

            return response?.data || response;
        }
        catch(err){
            setError(true);
            setIsLoading(false);

            const serverHealth = await getHealthServer();

            if(!serverHealth){
                return dispatch(setServerAvailable(false));
            }

            return err?.response || err;
        }
    };

    return {isLoading, error, request};
}

export default useRequest;