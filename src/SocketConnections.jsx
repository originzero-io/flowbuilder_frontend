import React, { useEffect } from "react";
import {
  elementListener,
  flowListener,
  projectListener,
  workspaceListener,
  noteListener,
  mainListener,
} from "./services/configurationService/socketListeners";
import createSocket from "services/SocketService";
import useAuth from "./hooks/useAuth";
export let elementNamespace;
export let flowNamespace;
export let projectNamespace;
export let workspaceNamespace;
export let noteNamespace;
export let mainNamespace;
export default function SocketConnections() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      mainNamespace = createSocket("main");
      elementNamespace = createSocket("elements");
      flowNamespace = createSocket("flows");
      projectNamespace = createSocket("projects");
      workspaceNamespace = createSocket("workspaces");
      noteNamespace = createSocket("notes");
      mainListener(mainNamespace);
      elementListener(elementNamespace);
      flowListener(flowNamespace);
      projectListener(projectNamespace);
      workspaceListener(workspaceNamespace);
      noteListener(noteNamespace);
    }
  }, [auth.isAuthenticated]);
  return <></>;
}
