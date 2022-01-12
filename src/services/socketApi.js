import io from "socket.io-client";
import { store } from "../index";
const HOST = "http://localhost:5001/";
import { openNotification } from "../app-global/dom/notification";
import { makeMeOnline } from "../store/reducers/authReducer";
import {
  saveElements,
  setElements,
} from "../store/reducers/flow/flowElementsReducer";
import {
  createFlow,
  deleteFlow,
  editFlow,
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
      //openNotification("", data.message, "success");
    });
    this.socket.on("connect_error", (err) => {
      openNotification("", err.message, "error");
    });
  }
}

export const projectSubscribe = (socket) => {
  socket.on("projects:create", (data) => {
    store.dispatch(createProject(data.project));
  });
  socket.on("projects:update", (data) => {
    store.dispatch(updateProject(data.project));
  });
  socket.on("projects:remove", (data) => {
    store.dispatch(deleteProject(data.project));
  });
};
export const workspaceSubscribe = (socket) => {
  socket.on("workspaces:create", (data) => {
    store.dispatch(createWorkspace(data.workspace));
  });
  socket.on("workspaces:update", (data) => {
    store.dispatch(editWorkspace(data.workspace));
  });
  socket.on("workspaces:remove", (data) => {
    store.dispatch(deleteWorkspace(data.workspace));
  });
};
export const flowSubscribe = (socket) => {
  socket.on("flows:remove", (data) => {
    store.dispatch(deleteFlow(data.flow));
  });
  socket.on("flows:update", (data) => {
    store.dispatch(editFlow(data.flow));
  });
  socket.on("flows:move", (data) => {
    store.dispatch(moveFlow(data.flow));
  });
  socket.on("flows:create", (data) => {
    store.dispatch(createFlow(data.flow));
  });
};
export const elementSubscribe = (socket) => {
  socket.on("elements:save", (data) => {
    store.dispatch(saveElements(data));
  });
  socket.on("elements:getElements", (data) => {
    store.dispatch(setElements(data.data));
    store.dispatch(endTheBar());
  });
};
export const noteSubscribe = (socket) => {
  socket.on("notes:create", (data) => {
    store.dispatch(createNote(data.note));
  });
  socket.on("notes:update", (data) => {
    store.dispatch(updateNote(data.note));
  });
  socket.on("notes:remove", (data) => {
    store.dispatch(deleteNote(data.note));
  });
};

export const mainSubscribe = (socket) => {
  const { auth } = store.getState();
  socket.emit("main:onlineUser", "MAKE_ME_ONLINE");
  socket.on("main:onlineUser", (data) => {
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      openNotification("", `${data.username} oturum açtı`, "success");
    } else {
      store.dispatch(editUser(data));
      store.dispatch(makeMeOnline(data));
    }
  });
  socket.on("main:offlineUser", (data) => {
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      openNotification("", `${data.username} oturumu kapadı`, "warning");
    } else alert("Oturum başka bir tabde açık");
  });
};
