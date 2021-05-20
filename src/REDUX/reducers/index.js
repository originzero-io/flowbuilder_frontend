import {combineReducers} from "redux";
import elementReducer from "./elementsReducer"
import {nodeClassReducer,flowConfigReducer} from "./flowReducers"
import {nodeGroupsReducer} from "./nodeGroupsReducers"
import {guiConfigReducer} from "./guiReducers"
import {menuConfigReducer} from "./menuReducers"
import {nodeListReducer} from "./nodeListReducers"
const reducers = combineReducers({
  elementReducer,
  guiConfigReducer,
  menuConfigReducer,
  nodeClassReducer,
  nodeListReducer,
  flowConfigReducer,
  nodeGroupsReducer
});

export default reducers;
