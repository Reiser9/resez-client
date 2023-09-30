import io from "socket.io-client";

export const socket = new io(process.env.REACT_APP_SOCKET_HOST || "http://localhost:8080", {
    autoConnect: false,
    withCredentials: true,
    reconnectionAttempts: "Infinity",
    timeout: 10000
});