import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { requestDataIsError } from '../utils/requestDataIsError';

import {initCollections} from '../redux/slices/training';

import useRequest from './useRequest';
import useError from './useError';
import useNotify from './useNotify';

const useTraining = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useNotify();
    const dispatch = useDispatch();

    const loadCollections = async () => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.COLLECTION, "", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, loadCollections);
        }

        dispatch(initCollections(response.data));
    }

    const createCollection = async (collection, description, isPrivate, QAPairs, successCallback = () => {}) => {
        setError(false);

        const trimCollection = collection.trim();
        const trimDescription = description.trim();

        if(!trimCollection){
            return alertNotify("Предупреждение", "Введите название коллекции", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.COLLECTION, "", HTTP_METHODS.POST, true, {
            collection: trimCollection,
            description: trimDescription,
            isPrivate,
            QAPairs
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => createCollection(collection, description, QAPairs));
        }

        // Добавление в начало созданную коллекцию
        successCallback();
    }

    const deleteCollection = async (id) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.COLLECTION, `/${id}`, HTTP_METHODS.DELETE, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => deleteCollection(id));
        }

        // Удаление коллекции
    }

    const updateCollection = async (id, collection, description, QAPairs) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.COLLECTION, "", HTTP_METHODS.PUT, true, {
            id,
            collection,
            description,
            QAPairs
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => updateCollection(id));
        }

        // Обновление коллекции
    }

    return{
        error,
        isLoading,
        loadCollections,
        createCollection,
        deleteCollection,
        updateCollection
    }
}

export default useTraining;