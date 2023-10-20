import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import {socket} from '../utils/socket';

import { CALL_STATUSES } from '../consts/CALL_STATUSES';

import {playSound} from '../utils/playSound';

import { incrementUreadNotifyCount, setUserBlocked } from '../redux/slices/user';
import { addNotifyInStart } from '../redux/slices/notify';
import { setCallInfo, setCallStatus } from '../redux/slices/call';

import useRequest from './useRequest';
import useNotify from './useNotify';

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
        let uniqId = localStorage.getItem("uniqueId");

        if(!uniqId){
            uniqId = v4();

            localStorage.setItem("uniqueId", uniqId);
        }

        socket.emit("connection", uniqId);
    }, []);

    React.useEffect(() => {
        socket.connect();
        
        socket.on("notify", data => {
            dispatch(addNotifyInStart(data.notify));
            dispatch(incrementUreadNotifyCount());
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

        socket.on("call-request", ({userData, callId}) => {
            dispatch(setCallInfo({user: userData, callId}));
            dispatch(setCallStatus(CALL_STATUSES.INCOMING));
            playSound("/assets/img/call.mp3");
        });

        return () => {
            socket.off("notify");
            socket.off("message");
            socket.off("blocked");
            socket.off("unblocked");
            socket.off("endSession");
            socket.off("call-request");
        };
    }, []);
}

export default useSocket;