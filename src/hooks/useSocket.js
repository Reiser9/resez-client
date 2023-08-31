import React from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const useSocket = () => {
    React.useEffect(() => {
        socket.emit("join", "228");
    }, []);

    React.useEffect(() => {
        socket.on("join", (data) => {
            console.log(data);
        });
    }, []);
}

export default useSocket;