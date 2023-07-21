import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { requestDataIsError } from '../utils/requestDataIsError';

import { initUser } from '../redux/slices/user';

import useRequest from './useRequest';
import useAlert from './useAlert';
import useError from './useError';

const useUser = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request} = useRequest();
    const {alertNotify} = useAlert();
    const {errorController} = useError();

    const getShortInfo = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/short-info", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, getShortInfo);
        }

        return response;
    }

    const changePasswordSendCode = async (oldPassword, newPassword, newPasswordAgain, successCallback = () => {}) => {
        setError(false);

        if(!oldPassword || oldPassword.length < 8){
            return alertNotify("Предупреждение", "Старый пароль не может быть меньше 8 символов", "warn");
        }
        else if(!newPassword || newPassword.length < 8){
            return alertNotify("Предупреждение", "Новый пароль не может быть меньше 8 символов", "warn");
        }
        else if(newPassword !== newPasswordAgain){
            return alertNotify("Предупреждение", "Пароли не совпадают", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/send-change-password-code", HTTP_METHODS.POST, true, {
            oldPassword,
            newPassword
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => changePasswordSendCode(oldPassword, newPassword, newPasswordAgain, successCallback));
        }

        alertNotify("Информация", "Вам отправлен код в телеграм для подтверждения смены пароля", "info");
        successCallback();
    }

    const changePasswordVerify = async (code, oldPassword, newPassword, successCallback = () => {}) => {
        setError(false);

        if(!code || code.length !== 6){
            return alertNotify("Предупреждение", "Некорректный код", "warn");
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/verify-change-password-code", HTTP_METHODS.PUT, true, {
            code,
            oldPassword,
            newPassword
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => changePasswordVerify(code, oldPassword, newPassword, successCallback));
        }

        alertNotify("Успешно", "Вы сменили пароль", "success");
        successCallback();
    }

    const changeAvatar = async (formData, successCallback = () => {}) => {
        setError(false);

        console.log(formData);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/set-avatar", HTTP_METHODS.POST, true, formData, {
            'Content-type': 'multipart/form-data'
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => changeAvatar(formData, successCallback));
        }

        alertNotify("Успешно", "Вы сменили аватар", "success");
        dispatch(initUser(response.data.user));
        successCallback();
    }

    return {
        isLoading,
        error,
        getShortInfo,
        changePasswordSendCode,
        changePasswordVerify,
        changeAvatar
    }
}

export default useUser;