import io from "socket.io-client";
const HOST = "http://localhost:5001/";
import { openNotification } from "../app-global/dom/notification";
const createSocket = (namespace, extraOptions) => {
  return new Socket(namespace, extraOptions).getSocket();
};
export default createSocket;

class Socket {
  constructor(namespace = "", extraOptions) {
    console.log("NAMESPACE:::", namespace);
    console.log("extraOptions:", extraOptions);
    const URL = HOST + namespace;
    console.log("URL:", URL);
    this.socket = io.connect(URL, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      ...extraOptions,
    });
    this.socket.on("connect", () =>
      console.log(`${namespace} namespaceine bağlandı.`)
    );
    this.socket.on(`${namespace}:welcome`, (data) => {
      console.log(`${namespace}:::welcome`, data);
      openNotification("", data.message, "success");
    });
  }
  getSocket() {
    return this.socket;
  }
}
