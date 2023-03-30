class FlowExecutorService {
  injectSocket(socket) {
    this.socket = socket;
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

  debugFlow(data) {
    this.socket.emit("debugFlow", data);
  }

  debugFlowByLabel(data) {
    this.socket.emit("debugFlowById", data);
  }

  removeAllListeners() {
    this.socket.removeAllListeners();
  }
}

export default new FlowExecutorService();
