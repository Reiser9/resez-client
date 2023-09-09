import React from 'react';
import { useDispatch } from 'react-redux';

import { HTTP_METHODS, REQUEST_TYPE } from '../consts/HTTP';

import { requestDataIsError } from '../utils/requestDataIsError';

import { initProfileData, initUser } from '../redux/slices/user';

import useRequest from './useRequest';
import useAlert from './useAlert';
import useError from './useError';

const useUser = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [profileInfoIsLoading, setProfileInfoIsLoading] = React.useState(false);
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

    const getProfileInfo = async () => {
        setError(false);
        setProfileInfoIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/profile-info", HTTP_METHODS.GET, true);

        setProfileInfoIsLoading(false);

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, getProfileInfo);
        }

        dispatch(initProfileData(response.data.user));
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

    const changeAvatar = async (formData, endImgLoader = () => {}, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/set-avatar", HTTP_METHODS.PUT, true, formData, {
            'Content-type': 'multipart/form-data'
        });

        setIsLoading(false);
        endImgLoader();

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => changeAvatar(formData, endImgLoader, successCallback));
        }

        alertNotify("Успешно", "Вы сменили аватар", "success");
        dispatch(initUser(response.data.user));
        successCallback();
    }

    const deleteAvatar = async (endImgLoader = () => {}, successCallback = () => {}) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/delete-avatar", HTTP_METHODS.PUT, true);

        setIsLoading(false);
        endImgLoader();

        if(requestDataIsError(response)){
            setError(true);

            return errorController(response, () => deleteAvatar(endImgLoader));
        }

        alertNotify("Успешно", "Вы удалили аватар", "success");
        dispatch(initUser(response.data.user));
        successCallback();
    }

    const changeData = async (firstName, lastName, birthDate, gender) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/update-profile", HTTP_METHODS.PUT, true, {
            firstName,
            lastName,
            birthDate,
            gender
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => changeData(firstName, lastName, birthDate, gender));
        }

        alertNotify("Успешно", "Данные сохранены", "success");
    }

    return {
        isLoading,
        profileInfoIsLoading,
        error,
        getShortInfo,
        getProfileInfo,
        changePasswordSendCode,
        changePasswordVerify,
        changeAvatar,
        deleteAvatar,
        changeData
    }
}

export default useUser;