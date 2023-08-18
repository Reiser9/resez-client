import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { HTTP_METHODS, REQUEST_TYPE } from "../consts/HTTP";

import {setMainColors} from '../utils/setMainColors';
import { initThemes, setMode } from "../redux/slices/theme";
import { changeThemeUser, initUser } from "../redux/slices/user";
import { requestDataIsError } from "../utils/requestDataIsError";

import useRequest from "./useRequest";
import useNotify from "./useNotify";
import useError from "./useError";

const useTheme = () => {
    const [initThemesIsLoading, setInitThemesIsLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const {mode, themes} = useSelector(state => state.theme);
    const {user} = useSelector(state => state.user);
    const {request} = useRequest();
    const {alertNotify} = useNotify();
    const {errorController} = useError();

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

    const getAllTheme = async (reload = false) => {
        setError(false);

        if(themes.length === 0 || reload){
            setInitThemesIsLoading(true);

            const response = await request(REQUEST_TYPE.THEME, "", HTTP_METHODS.GET, true);

            setInitThemesIsLoading(false);

            if(requestDataIsError(response)){
                return errorController(response, getAllTheme);
            }

            dispatch(initThemes(response.data));
        }
    }

    const getThemeById = async (id) => {
        setError(false);

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.THEME, `/${id}`, HTTP_METHODS.GET, true);

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => getThemeById(id));
        }

        return response.data.theme;
    }

    const editTheme = async (themeId) => {
        setError(false);

        if(user?.theme?.id === themeId){
            return;
        }

        setIsLoading(true);

        const response = await request(REQUEST_TYPE.USER, "/set-theme", HTTP_METHODS.PUT, true, {
            themeId
        });

        setIsLoading(false);

        if(requestDataIsError(response)){
            return errorController(response, () => editTheme(themeId));
        }

        dispatch(changeThemeUser(response.data.theme));

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
        getThemeById,
        editTheme
    };
};

export default useTheme;
