import React, { useEffect } from 'react';
import {
  elementListener,
  flowListener,
  projectListener,
  workspaceListener,
  noteListener,
  userListener,
  flowExecutorListener,
} from './services/configurationService/socketListeners';
import createSocket from 'services/SocketService';
import useAuth from './hooks/useAuth';

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
      console.log("process envv: ", process.env.REACT_APP_HOST_ENV);
      console.log("process envv: ", process.env.REACT_APP_SOCKET_LOCAL_URL);
      console.log("process envv: ", process.env.REACT_APP_BASE_LOCAL_URL);
      userNamespace = createSocket({ namespace: 'users' });
      elementNamespace = createSocket({ namespace: 'elements' });
      flowNamespace = createSocket({ namespace: 'flows' });
      projectNamespace = createSocket({ namespace: 'projects' });
      workspaceNamespace = createSocket({ namespace: 'workspaces' });
      noteNamespace = createSocket({ namespace: 'notes' });
      flowExecutorNamespace = createSocket({
        url: `http://${
          process.env.REACT_APP_HOST_ENV === 'development' ? 'localhost' : '138.68.104.15'
        }:5002`,
      });
      userListener(userNamespace);
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
