import React from 'react';
import { useDispatch } from "react-redux";

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { setIsAuth } from '../redux/slices/auth';
import { initUser } from '../redux/slices/user';

import {unmaskPhone} from '../utils/formatPhone';

import useRequest from './useRequest';
import useNotify from './useNotify';

const useAuth = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useNotify();

    const clearLocalData = () => {

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

        if(response.error){
            setError(true);
            return alertNotify("Ошибка", response.message, "error");
        }

        console.log(response);

        successCallback();
    }

    const sendCodeRegister = async () => {
        
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

        if(response.error){
            setError(true);
            return alertNotify("Ошибка", response.message, "error");
        }

        dispatch(setIsAuth(true));
        dispatch(initUser(response?.user));

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

        console.log(response);
    }

    return {isLoading, error, register, sendCodeRegister, login, recovery, newTokens}
}

export default useAuth;