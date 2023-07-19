import axios from 'axios';

import {
    BASE_API_URL_AUTH,
    BASE_API_URL_EMPTY,
    BASE_API_URL_SESSION,
    BASE_API_URL_THEME,
    BASE_API_URL_NOTIFY,
    BASE_API_URL_USER
} from './API_URLS';

export const authRequest = axios.create({
    baseURL: BASE_API_URL_AUTH,
    withCredentials: true
});

export const userRequest = axios.create({
    baseURL: BASE_API_URL_USER,
    withCredentials: true
});

export const sessionRequest = axios.create({
    baseURL: BASE_API_URL_SESSION,
    withCredentials: true
});

export const themeRequest = axios.create({
    baseURL: BASE_API_URL_THEME,
    withCredentials: true
});

export const notifyRequest = axios.create({
    baseURL: BASE_API_URL_NOTIFY,
    withCredentials: true
});

export const emptyRequest = axios.create({
    baseURL: BASE_API_URL_EMPTY,
    withCredentials: true
});