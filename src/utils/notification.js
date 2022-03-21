//import cogoToast from "cogo-toast";
import { NotificationManager } from "react-notifications";

export const openNotification = (title, content, type,delay=2000) => {
  NotificationManager[type](content, title, delay);
};
