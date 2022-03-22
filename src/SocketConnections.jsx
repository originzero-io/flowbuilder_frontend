import React, { useEffect } from "react";
import createSocket, {
  elementSubscribe,
  flowSubscribe,
  projectSubscribe,
  workspaceSubscribe,
  noteSubscribe,
  mainSubscribe,
} from "./services/socketApi";
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
      mainSubscribe(mainNamespace);
      elementSubscribe(elementNamespace);
      flowSubscribe(flowNamespace);
      projectSubscribe(projectNamespace);
      workspaceSubscribe(workspaceNamespace);
      noteSubscribe(noteNamespace);
    }
  }, [auth.isAuthenticated]);
  return <></>;
}
