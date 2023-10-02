import io from "socket.io-client";

const socketOptions = {
    withCredentials: true,
    forceNew: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
}

export const socket = new io(process.env.REACT_APP_SOCKET_HOST || "http://localhost:8080", socketOptions);