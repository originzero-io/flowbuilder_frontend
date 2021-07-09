import io from 'socket.io-client';

let socket;
export const init = () => {
    socket = io.connect("http://localhost:5000/my-namespace", {
        transports: ["websocket"],
        reconnectionAttempts:3
    })
    socket.on('connect', () => console.log("Connected!"));
}

export const sendMessage = (message) => {
    if (socket) {
        socket.emit("hello", message);
    }
}
export const subscribeChat = (cb) => {
    if (!socket) return;
    socket.on('hello-back', (message) => {
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