import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {socket} from '../utils/socket';

import useRequest from './useRequest';
import useNotify from './useNotify';

import { setUserBlocked } from '../redux/slices/user';
import { addNotifyInStart } from '../redux/slices/notify';

const useSocket = () => {
    const {user, sessionId} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {clearLocalData} = useRequest();
    const {alertNotify} = useNotify();

    React.useEffect(() => {
        if(!user.id || !sessionId){
            return;
        }

        socket.emit("join", user?.id, sessionId);
    }, [user, sessionId]);

    React.useEffect(() => {
        socket.connect();
        
        socket.on("notify", (data) => {
            dispatch(addNotifyInStart(data.notify));
            alertNotify("Информация", "Новое уведомление", "info", "/notifies", 4000);
        });

        socket.on("endSession", () => {
            clearLocalData();
            alertNotify("Сессия завершена", "Кто-то завершил вашу сессию", "error");
        });

        socket.on("blocked", () => {
            dispatch(setUserBlocked(true));
        });

        socket.on("unblocked", () => {
            dispatch(setUserBlocked(false));
        });

        return () => {
            socket.off("notify");
            socket.off("message");
            socket.off("blocked");
            socket.off("unblocked");
            socket.off("endSession");
        };
    }, []);
}

export default useSocket;