import { useEffect } from "react";
import connectSocket from "services/SocketIOClient";
import flowEvent from "services/configurationService/flowService/flowService.event";
import workspaceEvent from "services/configurationService/workspaceService/workspaceService.event";
import projectEvent from "services/configurationService/projectService/projectService.event";
import flowElementEvent from "services/configurationService/flowElementService/flowElementService.event";
import noteEvent from "services/configurationService/noteService/noteService.event";
import userEvent from "services/configurationService/userService/userService.event";
import useUserInitialListener from "services/configurationService/userService/userService.initialListener";
import useFlowElementInitialListener from "services/configurationService/flowElementService/flowElementService.initialListener";
import useFlowInitialListener from "services/configurationService/flowService/flowService.initialListener";
import useProjectInitialListener from "services/configurationService/projectService/projectService.initialListener";
import useWorkspaceInitialListener from "services/configurationService/workspaceService/workspaceService.initialListener";
import useNoteInitialListener from "services/configurationService/noteService/noteService.initialListener";
import useFlowExecutorInitialListener from "services/flowExecutorService/flowExecutor.initialListener";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import useAuth from "../utils/hooks/useAuth";

export default function SocketConnections() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      const userNamespace = connectSocket({
        path: "/configuration_socket",
        namespace: "users",
      });
      const elementNamespace = connectSocket({
        path: "/configuration_socket",
        namespace: "elements",
      });
      const flowNamespace = connectSocket({
        path: "/configuration_socket",
        namespace: "flows",
      });
      const projectNamespace = connectSocket({
        path: "/configuration_socket",
        namespace: "projects",
      });
      const workspaceNamespace = connectSocket({
        path: "/configuration_socket",
        namespace: "workspaces",
      });
      const noteNamespace = connectSocket({
        path: "/configuration_socket",
        namespace: "notes",
      });
      const flowExecutorSocket = connectSocket({
        path: "/flowExecutor_socket",
      });

      workspaceEvent.injectSocket(workspaceNamespace);
      projectEvent.injectSocket(projectNamespace);
      flowEvent.injectSocket(flowNamespace);
      flowElementEvent.injectSocket(elementNamespace);
      noteEvent.injectSocket(noteNamespace);
      userEvent.injectSocket(userNamespace);
      flowExecutorEvent.injectSocket(flowExecutorSocket);

      useUserInitialListener();
      useFlowElementInitialListener();
      useFlowInitialListener();
      useProjectInitialListener();
      useWorkspaceInitialListener();
      useNoteInitialListener();
      useFlowExecutorInitialListener();
    }
  }, [auth.isAuthenticated]);
  return null;
}
