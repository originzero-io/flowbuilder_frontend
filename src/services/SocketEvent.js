class SocketEvent {
  socket;

  injectSocket(socket) {
    this.socket = socket;
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default SocketEvent;
