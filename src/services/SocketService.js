import io from "socket.io-client";
import notification from "utils/notificationHelper";

class SocketService {
  constructor(namespace = "", extraOptions) {
    this.namespace = namespace;
    this.extraOptions = extraOptions;
    const URL = process.env.REACT_APP_SOCKET_URL + namespace;
    this.socket = io.connect(URL, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      auth: { token: localStorage.getItem("token") },
      ...extraOptions,
    });
    this.socket.on("connect", () => {
      console.log(`${namespace} namespaceine bağlandı.`);
      notification.success(`${this.namespace} namespace connected`);
    });
    this.socket.on(`${this.namespace}:welcome`, (data) => {
      //anything
    });
    this.socket.on("connect_error", (err) => {
      notification.error(`Connection error: ${err.message}`);
    });
    this.socket.onAny((event, data) => {
      if (data.isError) {
        notification.error(`socket event error: ${data.errorMessage}`);
        throw new Error(`socket event error: ${event}`);
      }
    });
  }
}

const createSocket = (namespace, extraOptions) => {
  return new SocketService(namespace, extraOptions).socket;
};

export default createSocket;
