import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {socket} from '../utils/socket';

import { setUserBlocked } from '../redux/slices/user';

const useSocket = () => {
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if(!user.id){
            return;
        }

        socket.emit("join", user?.id);
    }, [user]);

    React.useEffect(() => {
        socket.connect();
        
        socket.on("notify", (data) => {
            console.log(data.notify);
        });

        socket.on("blocked", () => {
            dispatch(setUserBlocked(true));
        });

        socket.on("unblocked", () => {
            dispatch(setUserBlocked(false));
        });

        return () => {
            socket.off("notify");
            socket.off("blocked");
            socket.off("unblocked");
        };
    }, []);
}

export default useSocket;