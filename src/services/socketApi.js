import io from 'socket.io-client';

let socket;
export const init = () => {
    console.log("Loading...");
    socket = io("http://localhost:4000", {
        transports:["websocket"]
    })
    socket.on('connect', () => console.log("Connected!"));
}

export const sendMessage = (message) => {
    if (socket) {
        console.log("burdayım")
        socket.emit("new-message", message);
    }
}
export const subscribeChat = (cb) => {
    if (!socket) return;
    socket.on('receive-message', (message) => {
        console.log("Sunucudan mesaj:", message);
        cb(message);
    })
    socket.on('merhabaDe', (message) => {
        console.log("Sunucudan mesaj:", message);
    })
}
export const disconnect = () => {
    if (!socket) return;
    socket.disconnect();
}