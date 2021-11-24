import io from 'socket.io-client';

let socket;
export const init = () => {
    socket = io.connect("http://localhost:5001/my-namespace", {
        transports: ["websocket"],
        reconnectionAttempts:3
    })
    socket.on('connect', () => console.log("Connected!"));
}
export const elementServiceInit = (cb) => {
    socket = io.connect("http://localhost:5001/elements", {
        transports: ["websocket"],
        reconnectionAttempts:3
    })
    socket.on('connect', () => console.log("Connected!"));
    socket.on('elements:welcome', (data) => console.log(data.message));
    socket.on('elements:save', (data) => {
        cb(data)
    })
}

export const sendMessage = (topic,message) => {
    if (socket) {
        socket.emit(topic, message);
    }
}
export const subscribeChat = (cb) => {
    if (!socket) return;
    socket.on('clientCount', (message) => {
        console.log("Sunucudan mesaj:", message);
        cb(message);
    })
    socket.emit('hello',{message:'hello'})
    socket.on('hello', (message) => {
        console.log("Sunucudan mesaj:", message);
    })
}
export const subscribeElementChannel = (cb) => {
    if (!socket) return;
    socket.on('elements:getElements', (data) => {
        cb(data);
    })
    
}
export const disconnect = () => {
    if (!socket) return;
    socket.disconnect();
}