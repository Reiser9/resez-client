import React from 'react';
import axios from 'axios';

import {BASE_API_URL_USER, BASE_API_URL_AUTH} from '../consts/API_URLS';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

const useRequest = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const authRequest = axios.create({
        baseURL: BASE_API_URL_AUTH
    });

    const userRequest = axios.create({
        baseURL: BASE_API_URL_USER
    });

    const axiosInstancesMap = new Map([
        [REQUEST_TYPE.AUTH, authRequest],
        [REQUEST_TYPE.USER, userRequest]
    ]);

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
        const typeToken = localStorage.getItem("typeToken");

        const axiosInstance = axiosInstancesMap.get(requestType);

        let reqHeaders = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            ...headers
        }

        if(isAuth){
            reqHeaders = {
                ...reqHeaders,
                'Authorization': `${typeToken} ${accessToken}`
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

            return err?.response?.data || err;
        }
    };

    return {isLoading, error, request};
}

export default useRequest;