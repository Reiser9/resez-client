import React from 'react';

import useRequest from './useRequest';
import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

const useAdmin = () => {
    const [error, setError] = React.useState(false);

    const {request} = useRequest();

    const getUsers = async (offset = 0, limit = 6) => {
        setError(false);

        const response = await request(REQUEST_TYPE.USER, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

        console.log(response);
    }

    return {
        error,
        getUsers
    }
}

export default useAdmin;