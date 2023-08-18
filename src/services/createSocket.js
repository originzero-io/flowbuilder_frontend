import io from "socket.io-client";
import notification from "utils/ui/notificationHelper";

class SocketIOClient {
  constructor(config) {
    const { url = "", namespace = "", path = "", extraOptions } = config;

    this.url = url;
    this.namespace = namespace;
    this.extraOptions = extraOptions;

    this.socket = io.connect(`${this.url}/${this.namespace}`, {
      transports: ["websocket"],
      path,
      reconnectionAttempts: 3,
      auth: { token: localStorage.getItem("token") },
      ...this.extraOptions,
    });
    this.socket.on("connect", () => {
      notification.success(`socket connected: ${this.url}`);
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

const createSocket = (config) => new SocketIOClient(config).socket;

export default createSocket;
