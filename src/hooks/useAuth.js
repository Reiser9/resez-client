import React from 'react';
import { useDispatch } from "react-redux";

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { setAuthIsLoading, setIsAuth } from '../redux/slices/auth';
import { initCodeData, initSessionId, initUser } from '../redux/slices/user';
import { setAppIsLoading } from '../redux/slices/app';

import {setMainColors} from '../utils/setMainColors';
import {unmaskPhone} from '../utils/formatPhone';
import { requestDataIsError } from '../utils/requestDataIsError';

import useRequest from './useRequest';
import useUser from './useUser';
import useError from './useError';
import useAlert from './useAlert';

const useAuth = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request, getHealthServer, clearLocalData, noAuthController} = useRequest();
    const {errorController} = useError();
    const {alertNotify} = useAlert();
    const {getShortInfo} = useUser();

    const reload = async () => {
        dispatch(setAppIsLoading(true));

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
            dispatch(setAuthIsLoading(false));
            
            return errorController(response, () => checkAuth(), "", "", async () => {
                dispatch(setAuthIsLoading(true));
                await noAuthController(checkAuth);
                return dispatch(setAuthIsLoading(false));
            });
        }

        const {data} = await getShortInfo() || "";

        if(!data){
            return dispatch(setAuthIsLoading(false));
        }

        const {primary, light} = data?.theme || {};
        setMainColors(primary, light);

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));
        dispatch(initSessionId(data.sessionId));
        dispatch(setAuthIsLoading(false));
    }

    const logout = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/logout", HTTP_METHODS.GET);

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => logout(successCallback), "Попробуйте еще раз");
        }

        successCallback();
        clearLocalData();
        alertNotify("Успешно", "Вы вышли из аккаунта", "success");
    }

    const login = async (nickname, password, successCallback = () => {}) => {
        setError(false);

        const nicknameTrim = nickname?.trim();
        const passwordTrim = password?.trim();

        if(!nicknameTrim){
            return alertNotify("Предупреждение", "Имя пользователя не может быть пустым", "warn");
        }
        else if(nicknameTrim.length < 3){
            return alertNotify("Предупреждение", "Имя пользователя не может быть меньше 3-х символов", "warn");
        }
        else if(!passwordTrim){
            return alertNotify("Предупреждение", "Пароль не может быть пустым", "warn");
        }
        else if(passwordTrim.length < 8){
            return alertNotify("Предупреждение", "Пароль должен быть больше 8 символов", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/login", HTTP_METHODS.POST, false, {
            nickname: nicknameTrim,
            password: passwordTrim
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => {});
        }

        const {data} = response;

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));
        dispatch(initSessionId(data.sessionId));
        dispatch(initCodeData(data.verificationCodeData));

        const {primary, light} = data?.user?.theme || {};
        setMainColors(primary, light);

        localStorage.setItem("accessToken", data.accessToken);

        alertNotify("Успешно", "Вы авторизовались", "success");
        successCallback();
    }

    const register = async (nickname, phoneNumber, password, successCallback = () => {}) => {
        setError(false);

        const formatPhoneNumber = unmaskPhone(phoneNumber);
        const nicknameTrim = nickname?.trim();
        const passwordTrim = password?.trim();

        if(!nicknameTrim){
            return alertNotify("Предупреждение", "Имя пользователя не может быть пустым", "warn");
        }
        else if(nicknameTrim.length < 3){
            return alertNotify("Предупреждение", "Имя пользователя не может быть меньше 3-х символов", "warn");
        }
        else if(!formatPhoneNumber){
            return alertNotify("Предупреждение", "Номер телефона не может быть пустым", "warn");
        }
        else if(formatPhoneNumber.length < 12){
            return alertNotify("Предупреждение", "Введите корректный номер телефона", "warn");
        }
        else if(!passwordTrim){
            return alertNotify("Предупреждение", "Пароль не может быть пустым", "warn");
        }
        else if(passwordTrim.length < 8){
            return alertNotify("Предупреждение", "Пароль должен быть больше 8 символов", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/register", HTTP_METHODS.POST, false, {
            nickname: nicknameTrim,
            phoneNumber: formatPhoneNumber,
            password: passwordTrim
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response);
        }

        const {data} = response;

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));
        dispatch(initSessionId(data.sessionId));
        dispatch(initCodeData(data.verificationCodeData));

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

            return errorController(response, () => sendCodeRegister(successCallback));
        }
        
        alertNotify("Успешно", "Код отправлен", "success");
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

            return errorController(response, () => verifyCodeRegister(code, successCallback));
        }

        const {data} = response;

        dispatch(setIsAuth(true));
        dispatch(initUser(data.user));
        
        alertNotify("Успешно", "Вы зарегистрировались", "success");
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

            return errorController(response);
        }

        alertNotify("Успешно", "Код отправлен", "success");
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

            return errorController(response);
        }

        successCallback();
    }

    const recoveryPassword = async (phoneNumber, code, password, passwordAgain, successCallback = () => {}, rejectCallback = () => {}) => {
        setError(false);

        const formatPhoneNumber = unmaskPhone(phoneNumber);
        const passwordTrim = password?.trim();
        const passwordAgainTrim = passwordAgain?.trim();

        if(!passwordTrim){
            return alertNotify("Предупреждение", "Введите пароль", "warn");
        }
        else if(passwordTrim.length < 8 && passwordTrim.length > 32){
            return alertNotify("Предупреждение", "Пароль не может быть меньше 8 и больше 32 символов", "warn");
        }
        else if(passwordTrim !== passwordAgainTrim){
            return alertNotify("Предупреждение", "Пароли не совпадают", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/recovery-password", HTTP_METHODS.PUT, false, {
            phoneNumber: formatPhoneNumber,
            code,
            password: passwordTrim
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => {}, "", () => {
                rejectCallback();
            });
        }

        alertNotify("Успешно", "Пароль восстановлен", "success");
        successCallback();
    }

    const sendVerificationCode = async (successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.AUTH, "/send-verification-code", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => sendVerificationCode(successCallback));
        }

        dispatch(initCodeData(response.data.verificationCodeData));
        successCallback();
    }

    return {
        isLoading,
        error,
        reload,
        checkAuth,
        logout,
        login,
        register,
        sendCodeRegister,
        verifyCodeRegister,
        sendRecoveryPasswordCode,
        verifyRecoveryCode,
        recoveryPassword,
        sendVerificationCode
    }
}

export default useAuth;