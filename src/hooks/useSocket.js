import React from 'react';
import { useSelector } from 'react-redux';

import {socket} from '../utils/socket';

const useSocket = () => {
    const {user} = useSelector(state => state.user);

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

        return () => {
            socket.off("notify");
        };
    }, []);
}

export default useSocket;