import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { HTTP_METHODS, REQUEST_TYPE } from "../consts/HTTP";

import {setMainColors} from '../utils/setMainColors';
import { initThemes, setMode, setThemes} from "../redux/slices/theme";
import { changeThemeUser } from "../redux/slices/user";
import { requestDataIsError } from "../utils/requestDataIsError";

import useRequest from "./useRequest";
import useNotify from "./useNotify";
import useError from "./useError";

const useTheme = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [themeIsLoading, setThemeIsLoading] = React.useState(false);
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

        setTimeout(() => {
            document.body.classList.remove("light", "dark");
            document.body.classList.add(newTheme);
        }, 1000);
    };

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

    const loadAllThemes = async (offset = 0, limit = 5, reload = false) => {
        setError(false);

        if(!themes.themes || reload){
            setThemeIsLoading(true);

            const response = await request(REQUEST_TYPE.THEME, `?offfset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setThemeIsLoading(false);

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

            const response = await request(REQUEST_TYPE.THEME, `?offset=${offset}&limit=${limit}`, HTTP_METHODS.GET, true);

            setIsLoading(false);

            if(requestDataIsError(response)){
                setError(true);
                return errorController(response, () => getAllThemes(offset, limit));
            }

            dispatch(setThemes(response.data));
        }
    }

    React.useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if(storedTheme){
            initTheme(storedTheme);
        }
    }, []);

    return {
        isLoading,
        themeIsLoading,
        error,
        changeTheme,
        editTheme,
        loadAllThemes,
        getAllThemes
    };
};

export default useTheme;
