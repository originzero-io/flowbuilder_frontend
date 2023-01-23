import { combineReducers } from "redux";
import flowElementsReducer from "./flow/flowElementsSlice";
import nodeClassReducer from "./flow/nodeClassSlice";
import flowGroupsReducer from "./flow/flowGroupsSlice";
import flowConfigReducer from "./flow/flowConfigSlice";
import flowGuiReducer from "./flow/flowGuiSlice";
import flowReducer from "./flow/flowSlice";
import menuReducer from "./menuSlice";
import nodeListReducer from "./nodeListSlice";
import controlPanelReducer from "./controlPanelSlice";
import { modalReducer,loadingBarReducer } from "./componentSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import userPermissionReducer from "./userPermissionSlice";
import authPermissionReducer from "./authPermissionSlice";
import workspaceReducer from "./workspaceSlice";
import projectReducer from "./projectSlice";
import notesReducer from "./noteSlice";

const reducers = combineReducers({
  auth:authReducer,
  users: userReducer,
  authPermissions: authPermissionReducer,
  userPermissions: userPermissionReducer,
  activeFlow: combineReducers({
    flowConfig: flowConfigReducer,
    flowGui: flowGuiReducer,
    flowElements: flowElementsReducer,
    flowGroups: flowGroupsReducer,
  }),
  workspaces: workspaceReducer,
  projects: projectReducer,
  flows: flowReducer,
  notes: notesReducer,
  menus: menuReducer,
  controlPanel: controlPanelReducer,
  modal: modalReducer,
  loadingBar: loadingBarReducer,
  nodeList: nodeListReducer,
  nodeClassReducer,
});

//resetting reducers after user log out
const rootReducer = (state, action) => {
  if (action.type === 'auth/logOut' || action.type === "RESET") {
    state = undefined;
  }
  return reducers(state, action);
}
export default rootReducer;
