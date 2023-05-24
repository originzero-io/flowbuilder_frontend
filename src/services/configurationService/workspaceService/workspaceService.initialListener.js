import store from "index";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
} from "store/reducers/workspaceSlice";
import notificationHelper from "utils/ui/notificationHelper";
import workspaceServiceSocket from "./workspaceService.event";

const useWorkspaceInitialListener = () => {
  workspaceServiceSocket.onCreateWorkspace((data) => {
    store.dispatch(createWorkspace(data.workspace));
    notificationHelper.success("Workspace created successfully");
  });
  workspaceServiceSocket.onUpdateWorkspace((data) => {
    store.dispatch(editWorkspace(data.workspace));
    notificationHelper.success("Workspace updated successfully");
  });
  workspaceServiceSocket.onDeleteWorkspace((data) => {
    store.dispatch(deleteWorkspace(data.workspaceId));
    notificationHelper.success("Workspace deleted successfully");
  });
};

export default useWorkspaceInitialListener;
