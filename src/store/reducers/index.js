import { combineReducers } from "redux";
import {
  nodeClassReducer,
  flowReducer,
  flowConfigReducer,
  flowWorkSpaceReducer,
} from "./flow/flowReducers";
import flowElementsReducer from "./flow/flowElementsReducer";
import flowGroupsReducer from "./flow/flowGroupsReducer";
import menuReducer from "./menuReducer";
import nodeListReducer from "./nodeListReducers";
import controlPanelReducer from "./controlPanelReducer";
import { modalReducer } from "./componentReducer";
import authReducer from "./authReducer";
import teamReducer from "./teamReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
const reducers = combineReducers({
  auth:authReducer,
  activeFlow: combineReducers({
    flowConfig: flowConfigReducer,
    flowWorkspace: flowWorkSpaceReducer,
    flowElements: flowElementsReducer,
    flowGroups: flowGroupsReducer,
  }),
  teams: teamReducer,
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
