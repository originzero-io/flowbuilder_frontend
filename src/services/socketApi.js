import io from "socket.io-client";
const HOST = "http://localhost:5001/";
import { openNotification } from "../app-global/dom/notification";
const createSocket = (namespace, extraOptions) => {
  return new Socket(namespace, extraOptions).socket;
};
export default createSocket;

class Socket {
  constructor(namespace = "", extraOptions) {
    const URL = HOST + namespace;
    this.socket = io.connect(URL, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      ...extraOptions,
    });
    this.socket.on("connect", () => {
      //console.log(`${namespace} namespaceine bağlandı.`);
    });
    this.socket.on(`${namespace}:welcome`, (data) => {
      //openNotification("", data.message, "success");
    });
    this.socket.on("connect_error", (err) => {
      openNotification("", err.message, "error");
    });
  }
}
