import io from "socket.io-client";
import notification from "utils/notificationHelper";

class SocketService {
  constructor(config) {
    const { namespace = "", path = "", extraOptions } = config;

    this.namespace = namespace;
    this.extraOptions = extraOptions;

    const URL = `${
      process.env.REACT_APP_HOST_ENV === 'development'
        ? process.env.REACT_APP_GATEWAY_LOCAL_URL
        : process.env.REACT_APP_GATEWAY_CLOUD_URL
    }`;
    this.socket = io.connect(`${URL}/${namespace}`, {
      transports: ["websocket"],
      path,
      reconnectionAttempts: 3,
      auth: { token: localStorage.getItem("token") },
      ...extraOptions,
    });
    this.socket.on("connect", () => {
      notification.success(`${this.namespace} namespace connected`);
    });
    this.socket.on(`${this.namespace}:welcome`, (data) => {
      // anything
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

const createSocket = (config) => new SocketService(config).socket;

export default createSocket;
