import flowEvent from "services/configurationService/flowService/flowService.event";
import workspaceEvent from "services/configurationService/workspaceService/workspaceService.event";
import projectEvent from "services/configurationService/projectService/projectService.event";
import noteEvent from "services/configurationService/noteService/noteService.event";
import userEvent from "services/configurationService/userService/userService.event";
import userInitialListener from "services/configurationService/userService/userService.initialListener";
import flowInitialListener from "services/configurationService/flowService/flowService.initialListener";
import projectInitialListener from "services/configurationService/projectService/projectService.initialListener";
import workspaceInitialListener from "services/configurationService/workspaceService/workspaceService.initialListener";
import noteInitialListener from "services/configurationService/noteService/noteService.initialListener";
import createSocket from "services/createSocket";

const socketConnectionToEntityManager = () => {
  const configurationSocket = createSocket({
    url: import.meta.env.VITE_CONFIGURATION_SERVICE_URL,
  });
  workspaceEvent.injectSocket(configurationSocket);
  projectEvent.injectSocket(configurationSocket);
  flowEvent.injectSocket(configurationSocket);
  noteEvent.injectSocket(configurationSocket);
  userEvent.injectSocket(configurationSocket);

  userInitialListener();
  flowInitialListener();
  projectInitialListener();
  workspaceInitialListener();
  noteInitialListener();

  return configurationSocket;
};

export default socketConnectionToEntityManager;
