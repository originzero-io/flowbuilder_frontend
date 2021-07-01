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
import authReducer from "./authReducer";
const reducers = combineReducers({
  authReducer,
  menuConfigReducer,
  nodeClassReducer,
  nodeListReducer,
  controlPanelReducer,
  flowReducer,
  activeFlowReducer: combineReducers({
    flowConfigReducer,
    flowWorkSpaceReducer,
    elementReducer,
    nodeGroupsReducer,
  }),
});

export default reducers;
