import React from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const useSocket = () => {
    const {user} = useSelector(state => state.user);

    React.useEffect(() => {
        socket.emit("join", user?.id);
    }, [user]);

    React.useEffect(() => {
        socket.on("notify", (data) => {
            console.log(data);
        });
    }, []);

    return{
        socket
    }
}

export default useSocket;