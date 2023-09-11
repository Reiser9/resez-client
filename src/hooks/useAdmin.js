import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { requestDataIsError } from '../utils/requestDataIsError';

import {
    initThemes,
    initUsers,
    setThemes,
    setThemesIsLoading,
    setUser,
    setUsers,
    setUsersIsLoading,
    addNewTheme,
    changeTheme,
    deleteTheme
} from '../redux/slices/admin';

import useRequest from './useRequest';
import useError from './useError';
import useAlert from './useAlert';

const useAdmin = () => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [notifyTypesIsLoading, setNotifyTypesIsLoading] = React.useState(false);
    const [themeByIdIsLoading, setThemeByIdIsLoading] = React.useState(false);
    const [serchUsersLoading, setSerchUsersLoading] = React.useState(false);
    const [userIsLoading, setUserIsLoading] = React.useState([]);
    const [themeIsLoading, setThemeIsLoading] = React.useState([]);

    const dispatch = useDispatch();
    const {users, themes} = useSelector(state => state.admin);

    const {request} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useAlert();

    const loadUsers = async (offset = 0, limit = 6) => {
        setError(false);

        dispatch(setUsersIsLoading(true));

        const response = await request(REQUEST_TYPE.ADMIN, `/user?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

        dispatch(setUsersIsLoading(false));

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => loadUsers(offset, limit));
        }
        
        dispatch(initUsers(response.data));
    }

    const getAllUsers = async (offset = 0, limit = 6) => {
        setError(false);

        if(!users?.users || users?.users?.length + 1 < offset + limit){
            const response = await request(REQUEST_TYPE.ADMIN, `/user?offset=${users?.users?.length}&limit=${limit}`, HTTP_METHODS.GET, true);

            if(requestDataIsError(response)){
                setError(true);

                return errorController(response, () => getAllUsers(users?.users?.length, limit));
            }
            
            dispatch(setUsers(response.data));
        }
    }

    const serchUsers = async (query = "", isShortInfo = false) => {
        setError(false);
        setSerchUsersLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, `/user?search=${query}&isShortInfo=${isShortInfo}`, HTTP_METHODS.GET, true);

        setSerchUsersLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => serchUsers(query, isShortInfo));
        }

        return response;
    }

    const userBlock = async (userId, successCallback = () => {}) => {
        setError(false);

        setUserIsLoading(prev => [...prev, userId]);

        const response = await request(REQUEST_TYPE.ADMIN, "/block", HTTP_METHODS.PUT, true, {
            userId
        });

        setUserIsLoading(prev => prev.filter(item => item !== userId));

        if(requestDataIsError(response)){
            return errorController(response, () => userBlock(userId, successCallback));
        }
        
        dispatch(setUser(response.data.user));
        alertNotify("Успешно", "Пользователь заблокирован", "success");
        successCallback();
    }

    const userUnblock = async (userId, successCallback = () => {}) => {
        setError(false);

        setUserIsLoading(prev => [...prev, userId]);

        const response = await request(REQUEST_TYPE.ADMIN, "/unblock", HTTP_METHODS.PUT, true, {
            userId
        });

        setUserIsLoading(prev => prev.filter(item => item !== userId));

        if(requestDataIsError(response)){
            return errorController(response, () => userBlock(userId, successCallback));
        }
        
        dispatch(setUser(response.data.user));
        alertNotify("Успешно", "Пользователь разблокирован", "success");
        successCallback();
    }

    const loadAllThemes = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!themes.themes || reload){
            dispatch(setThemesIsLoading(true));

            const response = await request(REQUEST_TYPE.ADMIN, `/theme?offfset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            dispatch(setThemesIsLoading(false));

            if(requestDataIsError(response)){
                setError(true);
                return errorController(response, () => loadAllThemes(offset, limit, reload));
            }

            dispatch(initThemes(response.data));
        }
    }

    const getAllThemes = async (offset = 0, limit = 5) => {
        setError(false);

        if(themes?.themes?.length === 0 || themes?.themes?.length < offset + limit){
            setIsLoading(true);

            const response = await request(REQUEST_TYPE.ADMIN, `/theme?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);
                return errorController(response, () => getAllThemes(offset, limit));
            }

            dispatch(setThemes(response.data));
        }
    }

    const getThemeById = async (id) => {
        setError(false);

        setThemeByIdIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, `/theme/${id}`, HTTP_METHODS.GET, true);

        setThemeByIdIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);
            return errorController(response, () => getThemeById(id));
        }

        return response.data.theme;
    }

    const createTheme = async (primary, light, isRatingEnabled, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/theme", HTTP_METHODS.POST, true, {
            primary,
            light,
            isRatingEnabled
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => createTheme(primary, light, isRatingEnabled, successCallback));
        }

        dispatch(addNewTheme(response.data.theme));
        alertNotify("Успешно", "Тема создана", "success");
        successCallback();
    }

    const editTheme = async (id, primary, light, isRatingEnabled, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/theme", HTTP_METHODS.PUT, true, {
            id,
            primary,
            light,
            isRatingEnabled
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => editTheme(id, primary, light, isRatingEnabled, successCallback));
        }

        dispatch(changeTheme({id, theme: response.data.theme}));
        alertNotify("Успешно", "Тема изменена", "success");
        successCallback();
    }

    const removeTheme = async (id, successCallback = () => {}) => {
        setError(false);

        setThemeIsLoading(prev => [...prev, id]);

        const response = await request(REQUEST_TYPE.ADMIN, `/theme/${id}`, HTTP_METHODS.DELETE, true);

        setThemeIsLoading(prev => prev.filter(item => item !== id));

        if(requestDataIsError(response)){
            return errorController(response, () => removeTheme(id, successCallback));
        }

        dispatch(deleteTheme(response.data.theme));
        alertNotify("Успешно", "Тема удалена", "success");
        successCallback();
    }

    const sendNotify = async (title, sender, userIDs, date, content, type = 1, successCallback = () => {}) => {
        setError(false);

        const titleTrim = title?.trim();
        const senderTrim = sender?.trim();

        if(!titleTrim){
            return alertNotify("Предупреждение", "Заголовок не может быть пустым", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, "/notify", HTTP_METHODS.POST, true, {
            title,
            sender: senderTrim,
            userIDs: userIDs || [],
            date,
            content,
            notifyTypeId: type
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => sendNotify(title, sender, userIDs, date, content));
        }

        alertNotify("Успешно", "Уведомление отправлено", "success");
        successCallback();
    }

    const getNotifyTypes = async () => {
        setError(false);
        setNotifyTypesIsLoading(true);

        const response = await request(REQUEST_TYPE.ADMIN, `/notify-type`, HTTP_METHODS.GET, true);

        setNotifyTypesIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, getNotifyTypes);
        }
        
        return response;
    }

    return {
        error,
        isLoading,
        notifyTypesIsLoading,
        themeByIdIsLoading,
        serchUsersLoading,
        userIsLoading,
        themeIsLoading,
        loadUsers,
        getAllUsers,
        serchUsers,
        userBlock,
        userUnblock,
        loadAllThemes,
        getAllThemes,
        getThemeById,
        createTheme,
        editTheme,
        removeTheme,
        sendNotify,
        getNotifyTypes
    }
}

export default useAdmin;