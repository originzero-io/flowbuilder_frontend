import { combineReducers } from "redux";
import elementReducer from "./elementsReducer";
import {
  nodeClassReducer,
  flowReducer,
  flowConfigReducer,
  flowWorkSpaceReducer,
} from "./flowReducers";
import { nodeGroupsReducer } from "./nodeGroupsReducers";
import { menuConfigReducer } from "./menuReducers";
import { nodeListReducer } from "./nodeListReducers";
import controlPanelReducer from "./controlPanelReducer";
import { modalReducer } from "./componentReducer";
import authReducer from "./authReducer";
import teamReducer from "./teamReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
const reducers = combineReducers({
  authReducer,
  menuConfigReducer,
  nodeClassReducer,
  nodeListReducer,
  controlPanelReducer,
  modalReducer,
  flowReducer,
  teamReducer,
  projectReducer,
  errorReducer,
  activeFlowReducer: combineReducers({
    flowConfigReducer,
    flowWorkSpaceReducer,
    elementReducer,
    nodeGroupsReducer,
  }),
});

export default reducers;
