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

  onFlowError(listener) {
    this.socket.on("flowError", (data) => listener(data));
  }

  leaveAllRooms() {
    this.socket.emit("leaveAllFlowRooms");
  }

  onDebugFlow(listener) {
    this.socket.on("debugFlow:response", (data) => listener(data));
  }

  debugFlow(data) {
    this.socket.emit("debugFlow", data);
  }

  startByTrigger(trigId) {
    this.socket.emit("startBySpesificTrigger", trigId);
  }

  removeAllListeners() {
    this.socket.removeAllListeners();
  }

  onClassMessage(listener) {
    this.socket.on("NODE_NEW", (data) => listener(data));
  }
}

export default new FlowExecutorEvent();
