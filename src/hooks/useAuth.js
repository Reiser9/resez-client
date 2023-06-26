import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { setAuthIsLoading, setDataAuth, setIsAuth, setVerified } from '../redux/slices/auth';
import { initUser, setDataUser } from '../redux/slices/user';
import { setAppIsLoading, setDataApp } from '../redux/slices/app';
import { setServerAvailable } from '../redux/slices/server';

import {unmaskPhone} from '../utils/formatPhone';

import useRequest from './useRequest';
import useNotify from './useNotify';
import useUser from './useUser';
import { APP_STATUSES } from '../consts/APP_STATUSES';

const useAuth = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request, getHealthServer} = useRequest();
    const {alertNotify} = useNotify();
    const {getShortInfo} = useUser();
    const navigate = useNavigate();

    const checkUserVerified = (user) => {
        if(user?.isVerified){
            dispatch(setVerified(true));
        }
        else{
            dispatch(setVerified(false));
        }
    }

    const clearLocalData = () => {
        localStorage.removeItem("accessToken");

        dispatch(setDataUser());
        dispatch(setDataAuth());
        dispatch(setDataApp());

        dispatch(setIsAuth(false));
    }

    const reload = async () => {
        dispatch(setAppIsLoading(true));
        dispatch(setServerAvailable(true));

        const response = await getHealthServer();

        if(response){
            checkAuth();
        }

        dispatch(setAppIsLoading(false));
    }

    const checkAuth = async () => {
        setError(false);

        const accessToken = localStorage.getItem("accessToken");

        if(!accessToken){
            return clearLocalData();
        }

        dispatch(setAuthIsLoading(true));
        dispatch(setAppIsLoading(true));

        const response = await request(REQUEST_TYPE.AUTH, "/check-auth", HTTP_METHODS.GET, true);

        dispatch(setAppIsLoading(false));

        if(response?.data?.error){
            const tokens = await newTokens();
            dispatch(setAuthIsLoading(false));

            if(!tokens){
                return clearLocalData()
            }

            return checkAuth();
        }

        const data = await getShortInfo();

        if(!data){
            return;
        }

        dispatch(setVerified(data.isVerified));
        dispatch(setAuthIsLoading(false));
    }

    const register = async (nickname, phoneNumber, password, successCallback = () => {}) => {
        setError(false);

        const formatPhoneNumber = unmaskPhone(phoneNumber);

        if(!nickname){
            return alertNotify("Предупреждение", "Имя пользователя не может быть пустым", "warn");
        }
        else if(nickname?.length < 3){
            return alertNotify("Предупреждение", "Имя пользователя не может быть меньше 3-х символов", "warn");
        }
        else if(!formatPhoneNumber){
            return alertNotify("Предупреждение", "Номер телефона не может быть пустым", "warn");
        }
        else if(formatPhoneNumber.length < 12){
            return alertNotify("Предупреждение", "Введите корректный номер телефона", "warn");
        }
        else if(!password){
            return alertNotify("Предупреждение", "Пароль не может быть пустым", "warn");
        }
        else if(password.length < 8){
            return alertNotify("Предупреждение", "Пароль должен быть больше 8 символов", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/register", HTTP_METHODS.POST, false, {
            nickname,
            phoneNumber: formatPhoneNumber,
            password
        });

        setIsLoading(false);

        if(response?.data?.error){
            setError(true);
            return alertNotify("Ошибка", response.data.message, "error");
        }

        dispatch(setIsAuth(true));
        dispatch(initUser(response?.user));

        localStorage.setItem("accessToken", response?.accessToken);

        successCallback();
    }

    const sendCodeRegister = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/send-register-code", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(response?.data?.error){
            setError(true);

            switch(response?.status){
                case 401:
                    navigate("/login");
                    clearLocalData();
                    return alertNotify("Ошибка", "Пожалуйста, авторизуйтесь повторно и повторите попытку", "error");
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        successCallback();
    }

    const verifyCodeRegister = async (code, successCallback = () => {}) => {
        setError(false);

        if(!code || code.length !== 6){
            return alertNotify("Предупреждение", "Введите корректный код", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/verify-register", HTTP_METHODS.POST, true, {
            code
        });

        setIsLoading(false);

        if(response?.data?.error){
            setError(true);

            switch(response?.data?.status){
                case 401:
                    navigate("/login");
                    clearLocalData();
                    return alertNotify("Ошибка", "Пожалуйста, авторизуйтесь повторно и повторите попытку", "error");
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        dispatch(setIsAuth(true));
        dispatch(initUser(response?.data?.user));
        checkUserVerified(response?.data?.user);
        
        successCallback();
    }

    const login = async (nickname, password, successCallback = () => {}) => {
        setError(false);

        if(!nickname){
            return alertNotify("Предупреждение", "Имя пользователя не может быть пустым", "warn");
        }
        else if(nickname?.length < 3){
            return alertNotify("Предупреждение", "Имя пользователя не может быть меньше 3-х символов", "warn");
        }
        else if(!password){
            return alertNotify("Предупреждение", "Пароль не может быть пустым", "warn");
        }
        else if(password.length < 8){
            return alertNotify("Предупреждение", "Пароль должен быть больше 8 символов", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {
            nickname,
            password
        });

        setIsLoading(false);

        if(response?.data?.error || response === APP_STATUSES.SERVER_NOT_AVAILABLE){
            setError(true);
            return alertNotify("Ошибка", response?.data?.message, "error");
        }

        dispatch(setIsAuth(true));
        dispatch(initUser(response?.user));
        checkUserVerified(response?.user);

        localStorage.setItem("accessToken", response?.accessToken);

        alertNotify("Успешно", "Вы авторизовались!", "success");
        successCallback();
    }

    const recovery = async () => {

    }

    const newTokens = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/refresh", HTTP_METHODS.GET);

        setIsLoading(false);

        if(response?.data?.error){
            return;
        }

        return response;
    }

    const logout = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/logout", HTTP_METHODS.GET);

        setIsLoading(false);

        if(response?.data?.error){
            return alertNotify("Ошибка", response.data.message, "error");
        }

        alertNotify("Успешно", "Вы вышли из аккаунта", "success");
        successCallback();
        clearLocalData();
    }

    const localLogout = (successCallback = () => {}) => {
        clearLocalData();
        successCallback();
    }

    return {
        isLoading,
        error,
        reload,
        checkAuth,
        register,
        sendCodeRegister,
        verifyCodeRegister,
        login,
        recovery,
        newTokens,
        logout,
        localLogout
    }
}

export default useAuth;