import React, { useEffect } from "react";
import createSocket, {
  elementSubscribe,
  flowSubscribe,
  projectSubscribe,
  workspaceSubscribe,
  noteSubscribe,
  mainSubscribe,
} from "../../services/socketApi";
import { useDispatch } from "react-redux";
import useAuth from "../../utils/useAuth";
export let elementNamespace;
export let flowNamespace;
export let projectNamespace;
export let workspaceNamespace;
export let noteNamespace;
export let mainNamespace;
export default function SocketConnections() {
  const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isAuthenticated) {
      mainNamespace = createSocket("main");
      elementNamespace = createSocket("elements");
      flowNamespace = createSocket("flows");
      projectNamespace = createSocket("projects");
      workspaceNamespace = createSocket("workspaces");
      noteNamespace = createSocket("notes");

      mainSubscribe(mainNamespace, dispatch, auth);
      elementSubscribe(elementNamespace, dispatch);
      flowSubscribe(flowNamespace, dispatch);
      projectSubscribe(projectNamespace, dispatch);
      workspaceSubscribe(workspaceNamespace, dispatch);
      noteSubscribe(noteNamespace, dispatch);
    }
  }, [auth.isAuthenticated]);
  return <></>;
}
