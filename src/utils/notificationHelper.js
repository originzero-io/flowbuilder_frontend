//import cogoToast from "cogo-toast";
import toast from "react-hot-toast";
import cogoToast from "cogo-toast";

class Notification {
  constructor(component) {
    this.component = component;
  }
  success(message) {
    this.component.success(message);
  }
  error(message) {
    this.component.error(message);
  }
  warn(message) {
    this.component.success(message, {
      style: { border: " 1px solid #f0932b" },
      iconTheme: {
        primary: "#f0932b",
        secondary: "#FFFAEE",
      },
    });
  }
}

export default new Notification(toast);
