import ConfigurationSocketService from "../index.socket";

class UserService extends ConfigurationSocketService {
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

export default new UserService();
