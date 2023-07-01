import React from 'react';
import { useDispatch } from "react-redux";

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { APP_STATUSES } from '../consts/APP_STATUSES';

import { setAuthIsLoading, setDataAuth, setIsAuth, setVerified } from '../redux/slices/auth';
import { initUser, setDataUser } from '../redux/slices/user';
import { setAppIsLoading, setDataApp } from '../redux/slices/app';
import { setServerAvailable } from '../redux/slices/server';

import {unmaskPhone} from '../utils/formatPhone';
import { requestDataIsError } from '../utils/requestDataIsError';

import useRequest from './useRequest';
import useNotify from './useNotify';
import useUser from './useUser';

const useAuth = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request, getHealthServer} = useRequest();
    const {alertNotify} = useNotify();
    const {getShortInfo} = useUser();

    const clearLocalData = () => {
        localStorage.removeItem("accessToken");

        dispatch(setDataUser());
        dispatch(setDataAuth());
        dispatch(setDataApp());

        dispatch(setIsAuth(false));
    }

    const checkUserVerified = (user) => {
        if(user?.isVerified){
            dispatch(setVerified(true));
        }
        else{
            dispatch(setVerified(false));
        }
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

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    const tokens = await newTokens();
                    dispatch(setAuthIsLoading(false));

                    if(!tokens){
                        return clearLocalData();
                    }

                    localStorage.setItem("accessToken", tokens.accessToken);

                    return checkAuth();
                default:
                    return alertNotify("Информация", response.data.message, "info");
            }
        }

        const {data} = await getShortInfo();
        dispatch(setAuthIsLoading(false));

        if(!data){
            return;
        }

        dispatch(setIsAuth(true));
        dispatch(initUser(data));
        dispatch(setVerified(data.isVerified));
        dispatch(setAuthIsLoading(false));
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

    const logout = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/logout", HTTP_METHODS.GET);

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                default:
                    return alertNotify("Ошибка", "Попробуйте еще раз", "error")
            }
        }

        alertNotify("Успешно", "Вы вышли из аккаунта", "success");
        successCallback();
        clearLocalData();
    }

    const localLogout = (successCallback = () => {}) => {
        clearLocalData();
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

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                default:
                    return alertNotify("Ошибка", "Неверный логин или пароль", "error");
            }
        }

        const {data} = response;

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));
        checkUserVerified(data.user);

        localStorage.setItem("accessToken", data.accessToken);

        alertNotify("Успешно", "Вы авторизовались!", "success");
        successCallback();
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

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        const {data} = response;

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));

        localStorage.setItem("accessToken", data.accessToken);

        successCallback();
    }

    const sendCodeRegister = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/send-register-code", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return; // Получение нового токена и вызов этой же функции
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

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        const {data} = response;

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));
        checkUserVerified(data.user);
        
        successCallback();
    }

    const sendRecoveryPasswordCode = async (phoneNumber, successCallback = () => {}) => {
        setError(false);

        const formatPhoneNumber = unmaskPhone(phoneNumber);

        if(!formatPhoneNumber){
            return alertNotify("Предупреждение", "Номер телефона не может быть пустым", "warn");
        }
        else if(formatPhoneNumber.length < 12){
            return alertNotify("Предупреждение", "Введите корректный номер телефона", "warn");
        }
        
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/send-recovery-password-code", HTTP_METHODS.POST, false, {
            phoneNumber: formatPhoneNumber
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        successCallback();
    }

    const verifyRecoveryCode = async (phoneNumber, code, successCallback = () => {}) => {
        setError(false);

        const formatPhoneNumber = unmaskPhone(phoneNumber);

        if(!code || code.length !== 6){
            return alertNotify("Предупреждение", "Введите корретный код", "warn");
        }
        
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/verify-recovery-password-code", HTTP_METHODS.POST, false, {
            phoneNumber: formatPhoneNumber,
            code
        });

        setIsLoading(false);
        
        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        successCallback();
    }

    const recoveryPassword = async (phoneNumber, code, password, passwordAgain, successCallback = () => {}, rejectCallback = () => {}) => {
        setError(false);

        const formatPhoneNumber = unmaskPhone(phoneNumber);

        if(!password){
            return alertNotify("Предупреждение", "Введите пароль", "warn");
        }
        else if(password.length < 8 && password.length > 32){
            return alertNotify("Предупреждение", "Пароль не может быть меньше 8 и больше 32 символов", "warn");
        }
        else if(password !== passwordAgain){
            return alertNotify("Предупреждение", "Пароли не совпадают", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/recovery-password", HTTP_METHODS.PUT, false, {
            phoneNumber: formatPhoneNumber,
            code,
            password
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                default:
                    rejectCallback();
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        successCallback();
    }

    return {
        isLoading,
        error,
        reload,
        checkAuth,
        newTokens,
        logout,
        login,
        register,
        sendCodeRegister,
        verifyCodeRegister,
        sendRecoveryPasswordCode,
        verifyRecoveryCode,
        recoveryPassword
    }
}

export default useAuth;