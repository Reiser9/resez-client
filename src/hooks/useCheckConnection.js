import React from 'react';
import { useDispatch } from 'react-redux';

import { setConnection } from '../redux/slices/app';

const useCheckConnection = () => {
    const [isOnline, setIsOnline] = React.useState(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        if (window.addEventListener) {
            window.addEventListener("online", handleOnline);
            window.addEventListener("offline", handleOffline);
        } 
        else {
            window.attachEvent("ononline", handleOnline);
            window.attachEvent("onoffline", handleOffline);
        }

        return () => {
            if (window.removeEventListener) {
                window.removeEventListener("online", handleOnline);
                window.removeEventListener("offline", handleOffline);
            } else {
                window.detachEvent("ononline", handleOnline);
                window.detachEvent("onoffline", handleOffline);
            }
        };
    }, []);

    React.useEffect(() => {
        dispatch(setConnection(isOnline));
    }, [isOnline]);
}

export default useCheckConnection;