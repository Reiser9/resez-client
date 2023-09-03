import io from "socket.io-client";

export const socket = new io(process.env.REACT_APP_SOCKET_HOST, {
    autoConnect: false,
    withCredentials: true
});