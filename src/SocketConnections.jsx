import React, { useEffect } from 'react';
import {
  elementListener,
  flowListener,
  projectListener,
  workspaceListener,
  noteListener,
  mainListener,
  flowExecutorListener,
} from './services/configurationService/socketListeners';
import createSocket from 'services/SocketService';
import useAuth from './hooks/useAuth';
export let elementNamespace;
export let flowNamespace;
export let projectNamespace;
export let workspaceNamespace;
export let noteNamespace;
export let mainNamespace;
export let flowExecutorNamespace;
export default function SocketConnections() {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      mainNamespace = createSocket({ namespace: 'main' });
      elementNamespace = createSocket({ namespace: 'elements' });
      flowNamespace = createSocket({ namespace: 'flows' });
      projectNamespace = createSocket({ namespace: 'projects' });
      workspaceNamespace = createSocket({ namespace: 'workspaces' });
      noteNamespace = createSocket({ namespace: 'notes' });
      flowExecutorNamespace = createSocket({ url: 'http://localhost:5002' });
      mainListener(mainNamespace);
      elementListener(elementNamespace);
      flowListener(flowNamespace);
      projectListener(projectNamespace);
      workspaceListener(workspaceNamespace);
      noteListener(noteNamespace);
      flowExecutorListener(flowExecutorNamespace);
    }
  }, [auth.isAuthenticated]);
  return <></>;
}
