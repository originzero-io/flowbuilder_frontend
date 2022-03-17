import io from "socket.io-client";
import { store } from "../index";
const HOST = process.env.REACT_APP_SOCKET_URL;
import toast from "react-hot-toast";
import { makeMeOnline } from "../store/reducers/authReducer";
import {
  saveElements,
  setElements,
} from "../store/reducers/flow/flowElementsReducer";
import {
  createFlow,
  deleteFlow,
  editFlow,
  getFlowsByWorkspace,
  moveFlow,
} from "../store/reducers/flow/flowReducer";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../store/reducers/notesReducer";
import {
  createProject,
  deleteProject,
  setActiveProject,
  updateProject,
} from "../store/reducers/projectReducer";
import { editUser } from "../store/reducers/userReducer";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
} from "../store/reducers/workspaceReducer";
import { endTheBar } from "../store/reducers/componentReducer";
const createSocket = (namespace, extraOptions) => {
  console.log("çalıştı->", namespace);
  return new Socket(namespace, extraOptions).socket;
};
export default createSocket;

class Socket {
  constructor(namespace = "", extraOptions) {
    this.namespace = namespace;
    this.extraOptions = extraOptions;
    const URL = HOST + namespace;
    this.socket = io.connect(URL, {
      transports: ["websocket"],
      reconnectionAttempts: 3,
      auth: { token: localStorage.getItem("token") },
      ...extraOptions,
    });
    this.socket.on("connect", () => {
      console.log(`${namespace} namespaceine bağlandı.`);
    });
    this.socket.on(`${this.namespace}:welcome`, (data) => {
      //anything
    });
    this.socket.on("connect_error", (err) => {
      toast.error(err.message);
    });
  }
}

export const projectSubscribe = (socket) => {
  socket.on("projects:create", (data) => {
    if (!data.isError) {
      store.dispatch(createProject(data.project));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("projects:update", (data) => {
    if (!data.isError) {
      store.dispatch(updateProject(data.project));
      const activeWorkspace = store.getState().workspaces.activeWorkspace;
      store.dispatch(getFlowsByWorkspace(activeWorkspace));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("projects:remove", (data) => {
    if (!data.isError) {
      store.dispatch(deleteProject(data.project));
      const activeWorkspace = store.getState().workspaces.activeWorkspace;
      const projects = store.getState().projects.projects;
      store.dispatch(getFlowsByWorkspace(activeWorkspace));
      store.dispatch(setActiveProject(projects[0]));
    } else {
      toast.error(data.errorMessage);
    }
  });
};
export const workspaceSubscribe = (socket) => {
  socket.on("workspaces:create", (data) => {
    if (!data.isError) {
      store.dispatch(createWorkspace(data.workspace));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("workspaces:update", (data) => {
    if (!data.isError) {
      store.dispatch(editWorkspace(data.workspace));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("workspaces:remove", (data) => {
    if (!data.isError) {
      store.dispatch(deleteWorkspace(data.workspace));
    } else {
      toast.error(data.errorMessage);
    }
  });
};
export const flowSubscribe = (socket) => {
  socket.on("flows:remove", (data) => {
    if (!data.isError) {
      store.dispatch(deleteFlow(data.flow));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("flows:update", (data) => {
    if (!data.isError) {
      store.dispatch(editFlow(data.flow));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("flows:move", (data) => {
    if (!data.isError) {
      store.dispatch(moveFlow(data.flow));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("flows:create", (data) => {
    if (!data.isError) {
      store.dispatch(createFlow(data.flow));
    } else {
      toast.error(data.errorMessage);
    }
  });
};
export const elementSubscribe = (socket) => {
  socket.on("elements:save", (data) => {
    if (!data.isError) {
      store.dispatch(saveElements(data));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("elements:getElements", (data) => {
    if (!data.isError) {
      store.dispatch(setElements(data.data));
      store.dispatch(endTheBar());
    } else {
      toast.error(data.errorMessage);
    }
  });
};
export const noteSubscribe = (socket) => {
  socket.on("notes:create", (data) => {
    if (!data.isError) {
      store.dispatch(createNote(data.note));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("notes:update", (data) => {
    if (!data.isError) {
      store.dispatch(updateNote(data.note));
    } else {
      toast.error(data.errorMessage);
    }
  });
  socket.on("notes:remove", (data) => {
    if (!data.isError) {
      store.dispatch(deleteNote(data.note));
    } else {
      toast.error(data.errorMessage);
    }
  });
};

export const mainSubscribe = (socket) => {
  const { auth } = store.getState();
  socket.emit("main:onlineUser", "MAKE_ME_ONLINE");
  socket.on("main:onlineUser", (data) => {
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      toast.success(`${data.username} oturum açtı`,{style:{background:'#40916c'}});
    } else {
      store.dispatch(editUser(data));
      store.dispatch(makeMeOnline(data));
    }
  });
  socket.on("main:offlineUser", (data) => {
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      toast(`${data.username} oturumu kapadı`, {
        style: { background: "orange", color: "whitesmoke" },
      });
    } else alert("Oturum başka bir tabde açık");
  });
};
