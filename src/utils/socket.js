import io from "socket.io-client";
import { v4 } from 'uuid';

let uniqId = localStorage.getItem("uniqueId");

if(!uniqId){
    uniqId = v4();

    localStorage.setItem("uniqueId", uniqId);
}

const socketOptions = {
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
    auth: {
        uniqId
    }
}

export const socket = new io(process.env.REACT_APP_SOCKET_HOST || "http://localhost:8080", socketOptions);