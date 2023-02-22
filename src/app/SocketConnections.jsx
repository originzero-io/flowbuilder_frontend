import { useEffect } from "react";
import createSocket from "services/socketIOClient";
import { useDispatch } from "react-redux";
import {
  elementListener,
  flowListener,
  projectListener,
  workspaceListener,
  noteListener,
  userListener,
} from "../services/configurationService/socketListeners";
import useAuth from "../utils/hooks/useAuth";

export let elementNamespace;
export let flowNamespace;
export let projectNamespace;
export let workspaceNamespace;
export let noteNamespace;
export let userNamespace;
export let flowExecutorNamespace;
export default function SocketConnections() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      userNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "users",
      });
      elementNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "elements",
      });
      flowNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "flows",
      });
      projectNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "projects",
      });
      workspaceNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "workspaces",
      });
      noteNamespace = createSocket({
        path: "/configuration_socket",
        namespace: "notes",
      });
      flowExecutorNamespace = createSocket({
        path: "/flowExecutor_socket",
      });

      userListener(userNamespace);
      elementListener(elementNamespace);
      flowListener(flowNamespace);
      projectListener(projectNamespace);
      workspaceListener(workspaceNamespace);
      noteListener(noteNamespace);
    }
  }, [auth.isAuthenticated]);
  return null;
}
