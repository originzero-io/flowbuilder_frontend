import { combineReducers } from "redux";
import flowElementsReducer from "./flow/flowElementsReducer";
import nodeClassReducer from "./flow/nodeClassReducer";
import flowGroupsReducer from "./flow/flowGroupsReducer";
import flowConfigReducer from "./flow/flowConfigReducer";
import flowGuiReducer from "./flow/flowGuiReducer";
import flowReducer from "./flow/flowReducer";
import menuReducer from "./menuReducer";
import nodeListReducer from "./nodeListReducer";
import controlPanelReducer from "./controlPanelReducer";
import { modalReducer,loadingBarReducer } from "./componentReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import userPermissionReducer from "./userPermissionReducer";
import workspaceReducer from "./workspaceReducer";
import projectReducer from "./projectReducer";
import notesReducer from "./notesReducer";
import * as actions from "../constants/authConstants";
const reducers = combineReducers({
  auth:authReducer,
  users: userReducer,
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
  if (action.type === actions.LOG_OUT || action.type === "RESET") {
    state = undefined;
  }
  return reducers(state, action);
}
export default rootReducer;
