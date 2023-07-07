import store from "index";
import SocketEvent from "services/SocketEvent";
import { setSystemNodes } from "store/reducers/systemNodeSlice";

class FlowExecutorEvent extends SocketEvent {
  getNodeList() {
    this.socket.emit("getNodeList", (response) => {
      store.dispatch(setSystemNodes(response));
    });
  }

  onNodeStatus(self, listener) {
    this.socket.on(self.id, (data) => listener(data));
  }

  sendMessage(message) {
    this.socket.emit("nodeComm", message);
  }

  joinRoom(flowId) {
    this.socket.emit("joinFlowRoom", flowId);
  }

  leaveAllRooms() {
    this.socket.emit("leaveAllFlowRooms");
  }

  onDebugFlow(listener) {
    this.socket.on("debugFlow:response", (data) => listener(data));
  }

  debugFlow(data, listener) {
    this.socket.emit("debugFlow", data, (response) => {
      listener(response);
    });
  }

  removeAllListeners() {
    this.socket.removeAllListeners();
  }
}

export default new FlowExecutorEvent();
