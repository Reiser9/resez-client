import io from "socket.io-client";

export const socket = new io("http://localhost:8080", {
    autoConnect: false,
    withCredentials: true
});