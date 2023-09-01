import React from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";

export const socket = io.connect("http://localhost:8080");

const useSocket = () => {
    const {user} = useSelector(state => state.user);

    React.useEffect(() => {
        socket.emit("join", user?.id);
    }, [user]);

    React.useEffect(() => {
        const handleNotify = (data) => {
            console.log(data);
        };
        
        socket.on("notify", handleNotify);

        return () => {
            socket.off("notify", handleNotify);
        };
    }, []);
}

export default useSocket;