import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';
import { APP_STATUSES } from '../consts/APP_STATUSES';

import useRequest from './useRequest';
import useNotify from './useNotify';

import { requestDataIsError } from '../utils/requestDataIsError';

const useUser = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {request, noAuthController} = useRequest();
    const {alertNotify} = useNotify();

    const getShortInfo = async () => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/short-info", HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(getShortInfo);
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
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

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => changePasswordSendCode(oldPassword, newPassword, newPasswordAgain, successCallback));
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        alertNotify("Информация", "Вам отправлен код в телеграм для подтверждения смены пароля", "info");
        successCallback();
    }

    const changePasswordVerify = async (code, oldPassword, newPassword, successCallback = () => {}) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/verify-change-password-code", HTTP_METHODS.PUT, true, {
            code,
            oldPassword,
            newPassword
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => changePasswordVerify(code, oldPassword, newPassword, successCallback));
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        alertNotify("Успешно", "Вы сменили пароль", "success");
        successCallback();
    }

    return {
        isLoading,
        error,
        getShortInfo,
        changePasswordSendCode,
        changePasswordVerify
    }
}

export default useUser;