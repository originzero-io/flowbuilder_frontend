import {combineReducers} from "redux";
import {nodeClassReducer, elementReducer,reactFlowInstanceReducer,clickedElementReducer,miniMapDisplayReducer} from "./flowReducers"
import {themeReducer,flagColorReducer,alignAllReducer} from "./guiReducers"
import {panelMenuReducer,multiSelectionMenuReducer,elementMenuReducer} from "./menuReducers"
import {nodeListReducer,recentNodesListReducer} from "./nodeListReducers"
const reducers = combineReducers({
  elementReducer,
  reactFlowInstanceReducer,
  clickedElementReducer,
  miniMapDisplayReducer,
  themeReducer,
  flagColorReducer,
  alignAllReducer,
  panelMenuReducer,
  elementMenuReducer,
  multiSelectionMenuReducer,
  nodeClassReducer,
  nodeListReducer,
  recentNodesListReducer
});

export default reducers;
