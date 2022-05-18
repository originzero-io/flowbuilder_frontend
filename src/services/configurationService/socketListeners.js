import { store } from "../../index";
import notification from "utils/notificationHelper";
import { makeMeOnline } from "store/reducers/authReducer";
import {
  saveElements,
  setElements,
} from "store/reducers/flow/flowElementsReducer";
import {
  createFlow,
  deleteFlow,
  editFlow,
  getFlowsByWorkspace,
  moveFlow,
} from "store/reducers/flow/flowReducer";
import {
  createNote,
  deleteNote,
  updateNote,
} from "store/reducers/notesReducer";
import {
  createProject,
  deleteProject,
  setActiveProject,
  updateProject,
} from "store/reducers/projectReducer";
import { editUser } from "store/reducers/userReducer";
import {
  createWorkspace,
  deleteWorkspace,
  editWorkspace,
} from "store/reducers/workspaceReducer";
import { endTheBar } from "store/reducers/componentReducer";

export const projectListener = (socket) => {
  socket.on("projects:create", (data) => {
    store.dispatch(createProject(data.project));
  });
  socket.on("projects:update", (data) => {
    store.dispatch(updateProject(data.project));
    const activeWorkspace = store.getState().workspaces.activeWorkspace;
    store.dispatch(getFlowsByWorkspace(activeWorkspace));
  });
  socket.on("projects:remove", (data) => {
    store.dispatch(deleteProject(data.project));
    const activeWorkspace = store.getState().workspaces.activeWorkspace;
    const projects = store.getState().projects.projects;
    store.dispatch(getFlowsByWorkspace(activeWorkspace));
    store.dispatch(setActiveProject(projects[0]));
  });
};
export const workspaceListener = (socket) => {
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
export const flowListener = (socket) => {
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
export const elementListener = (socket) => {
  socket.on("elements:save", (data) => {
    store.dispatch(saveElements(data.data.elements));
  });
  socket.on("elements:getElements", (data) => {
    store.dispatch(setElements(data.data));
    store.dispatch(endTheBar());
  });
};
export const noteListener = (socket) => {
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

export const mainListener = (socket) => {
  socket.emit("main:onlineUser", "MAKE_ME_ONLINE");
  socket.on("main:onlineUser", (data) => {
    const { auth } = store.getState();
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      notification.success(`${data.username} oturum açtı`);
    } else {
      store.dispatch(editUser(data));
      store.dispatch(makeMeOnline(data));
    }
  });
  socket.on("main:offlineUser", (data) => {
    const { auth } = store.getState();
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      notification.warn(`${data.username} oturumu kapadı`);
    } else alert("Oturum başka bir tabde açık");
  });
};
