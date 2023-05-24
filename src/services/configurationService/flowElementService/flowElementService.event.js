import SocketEvent from "services/SocketEvent";

class FlowElementEvent extends SocketEvent {
  onSaveElements(listener) {
    this.socket.on("elements:save", (data) => listener(data));
  }

  saveElements(data) {
    this.socket.emit("elements:save", data);
  }

  onGetElements(listener) {
    this.socket.on("elements:getElements", (data) => listener(data));
  }

  getElements(data) {
    this.socket.emit("elements:getElements", data);
  }
}

export default new FlowElementEvent();
