import { useEffect } from "react";
import createSocket from "services/socketIOClient";
import flowServiceSocket from "services/configurationService/flowService/flowService.socket";
import workspaceServiceSocket from "services/configurationService/workspaceService/workspaceService.socket";
import projectServiceSocket from "services/configurationService/projectService/projectService.socket";
import flowElementServiceSocket from "services/configurationService/flowElementService/flowElementService.socket";
import noteServiceSocket from "services/configurationService/noteService/noteService.socket";
import userServiceSocket from "services/configurationService/userService/userService.socket";
import flowExecutorSocket from "services/flowExecutorService/flowExecutor.socket";
import useUserInitialListener from "services/configurationService/userService/userService.listener";
import useFlowElementInitialListener from "services/configurationService/flowElementService/flowElementService.listener";
import useFlowInitialListener from "services/configurationService/flowService/flowService.listener";
import useProjectInitialListener from "services/configurationService/projectService/projectService.listener";
import useWorkspaceInitialListener from "services/configurationService/workspaceService/workspaceService.listener";
import useNoteInitialListener from "services/configurationService/noteService/noteService.listener";
import useAuth from "../utils/hooks/useAuth";

export default function SocketConnections() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      const userNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "users",
      });
      const elementNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "elements",
      });
      const flowNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "flows",
      });
      const projectNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "projects",
      });
      const workspaceNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "workspaces",
      });
      const noteNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "notes",
      });
      const flowExecutorNamespace = createSocket({
        path: "/flowExecutor_socket",
      });

      workspaceServiceSocket.injectSocket(workspaceNamespace);
      projectServiceSocket.injectSocket(projectNamespace);
      flowServiceSocket.injectSocket(flowNamespace);
      flowElementServiceSocket.injectSocket(elementNamespace);
      noteServiceSocket.injectSocket(noteNamespace);
      userServiceSocket.injectSocket(userNamespace);
      flowExecutorSocket.injectSocket(flowExecutorNamespace);
      useUserInitialListener();
      useFlowElementInitialListener();
      useFlowInitialListener();
      useProjectInitialListener();
      useWorkspaceInitialListener();
      useNoteInitialListener();
    }
  }, [auth.isAuthenticated]);
  return null;
}
