import {combineReducers} from "redux";
import elementReducer from "./elementsReducer"
import {nodeClassReducer,flowConfigReducer} from "./flowReducers"
import {nodeGroupsReducer} from "./nodeGroupsReducers"
import {guiConfigReducer} from "./guiReducers"
import {menuConfigReducer} from "./menuReducers"
import {nodeListReducer} from "./nodeListReducers"
import controlPanelReducer from "./controlPanelReducer"
const reducers = combineReducers({
  elementReducer,
  guiConfigReducer,
  menuConfigReducer,
  nodeClassReducer,
  nodeListReducer,
  flowConfigReducer,
  nodeGroupsReducer,
  controlPanelReducer
});

export default reducers;
