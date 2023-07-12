import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { HTTP_METHODS, REQUEST_TYPE } from "../consts/HTTP";
import { APP_STATUSES } from "../consts/APP_STATUSES";

import {setMainColors} from '../utils/setMainColors';
import { initThemes, setMode } from "../redux/slices/theme";
import { initUser } from "../redux/slices/user";
import { requestDataIsError } from "../utils/requestDataIsError";

import useRequest from "./useRequest";
import useNotify from "./useNotify";

const useTheme = () => {
    const [initThemesIsLoading, setInitThemesIsLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {mode, themes} = useSelector(state => state.theme);
    const {request, noAuthController} = useRequest();
    const {alertNotify} = useNotify();

    const initTheme = (themeInit) => {
        dispatch(setMode(themeInit));

        document.body.classList.remove("light", "dark");
        document.body.classList.add(themeInit);
    }

    const changeTheme = (themeInit = "") => {
        if(themeInit && themeInit === mode){
            return;
        }

        const newTheme = themeInit ? themeInit : mode === "light" ? "dark" : "light";

        dispatch(setMode(newTheme));
        localStorage.setItem("theme", newTheme);

        document.body.classList.remove("light", "dark");
        document.body.classList.add(newTheme);
    };

    const getAllTheme = async () => {
        setError(false);

        if(themes.length === 0){
            setInitThemesIsLoading(true);

            const response = await request(REQUEST_TYPE.THEME, "", HTTP_METHODS.GET, true);

            setInitThemesIsLoading(false);

            if(requestDataIsError(response)){
                switch(response){
                    case APP_STATUSES.SERVER_NOT_AVAILABLE:
                        return;
                    case APP_STATUSES.NOT_AUTH:
                        return noAuthController(() => getAllTheme());
                    default:
                        return alertNotify("Ошибка", response.data.message || "Что-то непонятное", "error");
                }
            }

            dispatch(initThemes(response.data.themes));
        }
    }

    const editTheme = async (themeId) => {
        setError(false);
        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/set-theme", HTTP_METHODS.PUT, true, {
            themeId
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            switch(response){
                case APP_STATUSES.SERVER_NOT_AVAILABLE:
                    return;
                case APP_STATUSES.NOT_AUTH:
                    return noAuthController(() => editTheme(themeId));
                default:
                    return alertNotify("Ошибка", response.data.message, "error");
            }
        }

        dispatch(initUser(response.data));

        const {primary, light} = response.data.theme;
        setMainColors(primary, light);

        alertNotify("Успешно", "Тема сайта изменена", "success");
    }

    React.useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if(storedTheme){
            initTheme(storedTheme);
        }
    }, []);

    return {
        initThemesIsLoading,
        isLoading,
        error,
        changeTheme,
        getAllTheme,
        editTheme
    };
};

export default useTheme;
