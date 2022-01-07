import io from "socket.io-client";
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

export const projectSubscribe = (socket, dispatch) => {
  socket.on("projects:create", (data) => {
    dispatch(createProject(data.project));
  });
  socket.on("projects:update", (data) => {
    dispatch(updateProject(data.project));
  });
  socket.on("projects:remove", (data) => {
    dispatch(deleteProject(data.project));
  });
};
export const workspaceSubscribe = (socket, dispatch) => {
  socket.on("workspaces:create", (data) => {
    dispatch(createWorkspace(data.workspace));
  });
  socket.on("workspaces:update", (data) => {
    dispatch(editWorkspace(data.workspace));
  });
  socket.on("workspaces:remove", (data) => {
    dispatch(deleteWorkspace(data.workspace));
  });
};
export const flowSubscribe = (socket, dispatch) => {
  socket.on("flows:remove", (data) => {
    dispatch(deleteFlow(data.flow));
  });
  socket.on("flows:update", (data) => {
    dispatch(editFlow(data.flow));
  });
  socket.on("flows:move", (data) => {
    dispatch(moveFlow(data.flow));
  });
  socket.on("flows:create", (data) => {
    dispatch(createFlow(data.flow));
  });
};
export const elementSubscribe = (socket, dispatch) => {
  socket.on("elements:save", (data) => {
    dispatch(saveElements(data));
  });
  socket.on("elements:getElements", (data) => {
    dispatch(setElements(data.data));
  });
};
export const noteSubscribe = (socket, dispatch) => {
  socket.on("notes:create", (data) => {
    dispatch(createNote(data.note));
  });
  socket.on("notes:update", (data) => {
    dispatch(updateNote(data.note));
  });
  socket.on("notes:remove", (data) => {
    dispatch(deleteNote(data.note));
  });
};

export const mainSubscribe = (socket, dispatch,auth) => {
  socket.emit("main:onlineUser", "MAKE_ME_ONLINE");
  socket.on("main:onlineUser", (data) => {
    if (auth._id !== data._id) {
      dispatch(editUser(data));
      openNotification("", `${data.username} oturum açtı`, "success");
    } else {
      dispatch(editUser(data));
      dispatch(makeMeOnline(data));
    }
  });
  socket.on("main:offlineUser", (data) => {
    if (auth._id !== data._id) {
      dispatch(editUser(data));
      openNotification("", `${data.username} oturumu kapadı`, "warning");
    } else alert("Oturum başka bir tabde açık");
  });
};
