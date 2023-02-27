export default class ConfigurationSocketService {
  socket;

  injectSocket(socket) {
    this.socket = socket;
  }

  disconnect() {
    this.socket.disconnect();
  }
}
