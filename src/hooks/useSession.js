import React from 'react';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import useRequest from "./useRequest";

const useSession = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();

    const getAllSessions = async () => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.SESSION, "", HTTP_METHODS.GET, true);

        setIsLoading(false);

        console.log(response);
    }

    return {
        isLoading,
        error,
        getAllSessions
    }
}

export default useSession;