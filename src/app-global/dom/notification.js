import cogoToast from "cogo-toast";
import { NotificationManager } from "react-notifications";
const openNotification2 = (type, description) => {
  cogoToast.success(description, {
    position: "top-right",
    heading: type
  });
};

export const openNotification = (title, content, type) => {
  NotificationManager[type](content, title, 2000);
  //NotificationManager.success(content, title, 10000);
};
