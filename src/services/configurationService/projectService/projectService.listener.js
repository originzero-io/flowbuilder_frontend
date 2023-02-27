import store from "index";
import { getFlowsByWorkspace } from "store/reducers/flow/flowSlice";
import {
  createProject,
  deleteProject,
  setActiveProject,
  updateProject,
} from "store/reducers/projectSlice";
import notificationHelper from "utils/ui/notificationHelper";
import projectServiceSocket from "./projectService.socket";

const useProjectInitialListener = () => {
  projectServiceSocket.onCreateProject((data) => {
    store.dispatch(createProject(data.project));
    notificationHelper.success("Project created successfully");
  });
  projectServiceSocket.onUpdateProject((data) => {
    store.dispatch(updateProject(data.project));
    const { activeWorkspace } = store.getState().workspaces;
    store.dispatch(getFlowsByWorkspace(activeWorkspace));
    notificationHelper.success("Project updated successfully");
  });
  projectServiceSocket.onDeleteProject((data) => {
    store.dispatch(deleteProject(data.projectId));
    const { activeWorkspace } = store.getState().workspaces;
    const { projects } = store.getState().projects;
    store.dispatch(getFlowsByWorkspace(activeWorkspace));
    store.dispatch(setActiveProject(projects[0]));
    notificationHelper.success("Project deleted successfully");
  });
};

export default useProjectInitialListener;
