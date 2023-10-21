import io from "socket.io-client";
import { v4 } from 'uuid';

let uniqueId = localStorage.getItem("uniqueId");

if(!uniqueId){
    uniqueId = v4();

    localStorage.setItem("uniqueId", uniqueId);
}

const socketOptions = {
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
    auth: {
        uniqueId
    }
}

export const socket = new io(process.env.REACT_APP_SOCKET_HOST || "http://localhost:8080", socketOptions);