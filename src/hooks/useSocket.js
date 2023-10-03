import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {socket} from '../utils/socket';

import { ACTIONS } from '../consts/ACTIONS';

import { incrementUreadNotifyCount, setUserBlocked } from '../redux/slices/user';
import { addNotifyInStart } from '../redux/slices/notify';

import useRequest from './useRequest';
import useNotify from './useNotify';
import useCalls from './useCalls';

const useSocket = () => {
    const {user, sessionId} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const {clearLocalData} = useRequest();
    const {alertNotify} = useNotify();
    const {
        requestCallHandler,
        calledUserInfoHandler,
        callAcceptHandler,
        handleRemovePeer,
        iceCandidateHandler,
        setRemoteMedia,
        handleNewPeer
    } = useCalls();

    React.useEffect(() => {
        if(!user.id || !sessionId){
            return;
        }

        socket.emit("join", user?.id, sessionId);
    }, [user, sessionId]);

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

        socket.on(ACTIONS.CALL_REQUEST, requestCallHandler);
        socket.on(ACTIONS.CALLED_USER_INFO, calledUserInfoHandler);
        socket.on(ACTIONS.CALL_ACCEPT, callAcceptHandler);
        socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
        socket.on(ACTIONS.ICE_CANDIDATE, iceCandidateHandler);
        socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
        socket.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.off("notify");
            socket.off("message");
            socket.off("blocked");
            socket.off("unblocked");
            socket.off("endSession");
            socket.off(ACTIONS.CALL_REQUEST);
            socket.off(ACTIONS.CALLED_USER_INFO);
            socket.off(ACTIONS.CALL_ACCEPT);
            socket.off(ACTIONS.REMOVE_PEER);
            socket.off(ACTIONS.ICE_CANDIDATE);
            socket.off(ACTIONS.SESSION_DESCRIPTION);
            socket.off(ACTIONS.ADD_PEER);
        };
    }, []);
}

export default useSocket;