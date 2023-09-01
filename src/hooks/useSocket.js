import React from 'react';
import { useSelector } from 'react-redux';
import io from "socket.io-client";

const useSocket = () => {
    const {user} = useSelector(state => state.user);

    const socket = React.useMemo(() => io.connect("http://localhost:8080"), []);

    React.useEffect(() => {
        socket.emit("join", user?.id);
    }, [socket, user]);

    React.useEffect(() => {
        const handleNotify = (data) => {
            console.log(data);
        };

        socket.on("notify", handleNotify);

        return () => {
            socket.off("notify", handleNotify);
        };
    }, [socket]);

    return{
        socket
    }
}

export default useSocket;