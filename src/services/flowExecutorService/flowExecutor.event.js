import SocketEvent from "services/SocketEvent";

class FlowExecutorEvent extends SocketEvent {
  getNodeList(listener) {
    this.socket.emit("nodeList:get", listener);
  }

  onNodeStatus(self, listener) {
    this.socket.on(self.id, (data) => listener(data));
  }

  onFlowError(listener) {
    this.socket.on("flow:error", (data) => listener(data));
  }

  onFlowNotification(listener) {
    this.socket.on("flow:notification", (data) => listener(data));
  }

  onDebugFlow(listener) {
    this.socket.on("flow:debug", listener);
  }

  debugFlow(data) {
    this.socket.emit("flow:debug", data);
  }

  startByTrigger(trigId) {
    this.socket.emit("flow:startBySpesificTrigger", trigId);
  }

  //! NEW
  stopExecution(listener) {
    this.socket.emit("flow:stop", listener);
  }

  onClassMessage(listener) {
    this.socket.on("NODE_NEW", listener);
  }

  // onGetElements(listener) {
  //   this.socket.on("elements:get", (data) => listener(data));
  // }

  getElements(data) {
    this.socket.emit("elements:get", data);
  }

  saveElements(data, listener) {
    this.socket.emit("elements:save", data, listener);
  }

  getGUISettings(listener) {
    this.socket.emit("gui:get", listener);
  }

  saveGUISettings(data, listener) {
    this.socket.emit("gui:save", data, listener);
  }
}

export default new FlowExecutorEvent();
