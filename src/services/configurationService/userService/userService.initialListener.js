import store from "index";
import { makeMeOnline } from "store/reducers/authSlice";
import { editUser } from "store/reducers/userSlice";
import notificationHelper from "utils/ui/notificationHelper";
import userServiceSocket from "./userService.event";

const useUserInitialListener = () => {
  userServiceSocket.setOnlineUser("MAKE_ME_ONLINE");
  userServiceSocket.onOnlineUser((data) => {
    const { auth } = store.getState();
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      notificationHelper.success(`${data.username} oturum açtı`);
    } else {
      store.dispatch(editUser(data));
      store.dispatch(makeMeOnline(data));
    }
  });
  userServiceSocket.onOfflineUser((data) => {
    const { auth } = store.getState();
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      notificationHelper.warn(`${data.username} oturumu kapadı`);
    } else alert("Oturum başka bir tabde açık");
  });
};

export default useUserInitialListener;
