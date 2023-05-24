import SocketEvent from "services/SocketEvent";

class UserEvent extends SocketEvent {
  onOnlineUser(listener) {
    this.socket.on("user:onlineUser", (data) => listener(data));
  }

  setOnlineUser(data) {
    this.socket.emit("user:onlineUser", data);
  }

  onOfflineUser(listener) {
    this.socket.on("user:offlineUser", (data) => listener(data));
  }

  setOfflineUser(data) {
    this.socket.emit("user:offlineUser", data);
  }
}

export default new UserEvent();
