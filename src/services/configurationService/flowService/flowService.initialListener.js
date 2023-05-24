import store from "index";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import {
  createFlow,
  deleteFlow,
  editFlow,
  moveFlow,
} from "store/reducers/flow/flowSlice";
import notificationHelper from "utils/ui/notificationHelper";
import flowServiceSocket from "./flowService.event";

const useFlowInitialListener = () => {
  flowServiceSocket.onCreateFlow((data) => {
    const { auth, workspaces } = store.getState();
    store.dispatch(createFlow(data.flow));
    store.dispatch(
      getMyPermissionInThisWorkspace({
        workspace: workspaces.activeWorksapce,
        me: auth,
      }),
    );
    notificationHelper.success("Flow created successfully");
  });
  flowServiceSocket.onUpdateFlow((data) => {
    store.dispatch(editFlow(data.flow));
    notificationHelper.success("Flow updated successfully");
  });
  flowServiceSocket.onDeleteFlow((data) => {
    store.dispatch(deleteFlow(data.flowId));
    notificationHelper.success("Flow deleted successfully");
  });
  flowServiceSocket.onMoveFlow((data) => {
    store.dispatch(moveFlow(data.flow));
    notificationHelper.success("Flow moved successfully");
  });
};
export default useFlowInitialListener;
