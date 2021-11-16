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
import { modalReducer } from "./componentReducer";
import authReducer from "./authReducer";
import workspaceReducer from "./workspaceReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
const reducers = combineReducers({
  auth:authReducer,
  activeFlow: combineReducers({
    flowConfig: flowConfigReducer,
    flowGui: flowGuiReducer,
    flowElements: flowElementsReducer,
    flowGroups: flowGroupsReducer,
  }),
  workspaces: workspaceReducer,
  projects: projectReducer,
  flows: flowReducer,
  menus: menuReducer,
  controlPanel: controlPanelReducer,
  modal: modalReducer,
  error: errorReducer,
  nodeList: nodeListReducer,
  nodeClassReducer,
});

export default reducers;
