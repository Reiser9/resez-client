import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { requestDataIsError } from '../utils/requestDataIsError';

import {addCollection, editCollection, initCollection, initCollections, removeCollection, setCollections, setCollectionsIsLoading} from '../redux/slices/training';

import useRequest from './useRequest';
import useError from './useError';
import useNotify from './useNotify';

const useTraining = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [collectionByIdIsLoading, setCollectionByIdIsLoading] = React.useState(false);
    const [collectionIsLoading, setCollectionIsLoading] = React.useState([]);

    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useNotify();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {collections} = useSelector(state => state.training);

    const loadCollections = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!collections.collections || reload){
            dispatch(setCollectionsIsLoading(true));

            const response = await request(REQUEST_TYPE.COLLECTION, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setCollectionsIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);
                
                return errorController(response, () => loadCollections(offset, limit, reload));
            }

            dispatch(initCollections(response.data));
        }
    }

    const getCollections = async (offset = 0, limit = 5) => {
        setError(false);

        if(collections?.collections?.length === 0 || collections?.collections?.length < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.COLLECTION, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getCollections(offset, limit));
            }

            dispatch(setCollections(response.data.collections));
        }
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

            return errorController(response, () => createCollection(collection, description, isPrivate, QAPairs, successCallback));
        }

        dispatch(addCollection(response.data.collection));
        alertNotify("Успешно", "Коллекция создана", "success");
        successCallback();
    }

    const deleteCollection = async (id, successCallback = () => {}) => {
        setError(false);

        setCollectionIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.COLLECTION, `/${id}`, HTTP_METHODS.DELETE, true);

        setCollectionIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => deleteCollection(id, successCallback));
        }

        dispatch(removeCollection(response.data.collection));
        alertNotify("Успешно", "Коллекция удалена", "success");
        successCallback();
    }

    const updateCollection = async (id, collection, description, isPrivate, QAPairs, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.COLLECTION, "", HTTP_METHODS.PUT, true, {
            id,
            collection,
            description,
            isPrivate,
            QAPairs
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => updateCollection(id, collection, description, isPrivate, QAPairs, successCallback));
        }
        
        dispatch(editCollection(response.data.collection))
        alertNotify("Успешно", "Коллекция обновлена", "success");
        successCallback();
    }

    const getCollectionById = async (id, notFoundCallback = () => {}) => {
        setError(false);

        setCollectionByIdIsLoading(true);

        const response = await request(REQUEST_TYPE.COLLECTION, `${id}`, HTTP_METHODS.GET, true);

        setCollectionByIdIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => getCollectionById(id, notFoundCallback), "", () => {
                notFoundCallback();
                alertNotify("Ошибка", response?.data?.message, "error");
            });
        }

        dispatch(initCollection(response.data.collection));
    }

    return{
        error,
        isLoading,
        collectionIsLoading,
        collectionByIdIsLoading,
        loadCollections,
        getCollections,
        createCollection,
        deleteCollection,
        updateCollection,
        getCollectionById
    }
}

export default useTraining;