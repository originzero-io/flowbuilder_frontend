import store from "index";
import { getMyPermissionInThisWorkspace } from "store/reducers/authPermissionSlice";
import { createFlow, deleteFlow, editFlow, moveFlow } from "store/reducers/flow/flowSlice";
import notificationHelper from "utils/ui/notificationHelper";
import flowExent from "./flowService.event";

const flowInitialListener = () => {
  flowExent.onCreateFlow(async (data) => {
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
  flowExent.onUpdateFlow((data) => {
    store.dispatch(editFlow(data.flow));
    notificationHelper.success("Flow updated successfully");
  });
  flowExent.onDeleteFlow((data) => {
    store.dispatch(deleteFlow(data.flowId));
    notificationHelper.success("Flow deleted successfully");
  });
  flowExent.onMoveFlow((data) => {
    store.dispatch(moveFlow(data.flow));
    notificationHelper.success("Flow moved successfully");
  });
};
export default flowInitialListener;
