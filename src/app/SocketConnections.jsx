import { useEffect } from "react";
import createSocket from "services/createSocket";
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
      const configurationSocket = createSocket({
        url: import.meta.env.VITE_CONFIGURATION_SERVICE_URL,
      });

      workspaceEvent.injectSocket(configurationSocket);
      projectEvent.injectSocket(configurationSocket);
      flowEvent.injectSocket(configurationSocket);
      flowElementEvent.injectSocket(configurationSocket);
      noteEvent.injectSocket(configurationSocket);
      userEvent.injectSocket(configurationSocket);

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
