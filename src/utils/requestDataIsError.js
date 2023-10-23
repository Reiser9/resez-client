import { APP_STATUSES } from "../consts/APP_STATUSES";

export const requestDataIsError = (data) => {
    return (
        data?.status === 400 ||
        data?.status === 401 ||
        data?.status === 403 ||
        data?.status === 404 ||
        data?.status === 429 ||
        data?.status === 500 ||
        data === APP_STATUSES.SERVER_NOT_AVAILABLE ||
        data === APP_STATUSES.YOUR_BLOCKED ||
        data === APP_STATUSES.NOT_AUTH ||
        data === APP_STATUSES.TOO_MANY_REQUESTS
    );
};
