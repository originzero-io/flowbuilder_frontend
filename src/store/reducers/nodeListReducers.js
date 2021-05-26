import * as types from "../../components/flow-editor/nodes/constant/nodeTypes";
import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "../../components/flow-editor/nodes/global/icons";
import * as actionTypes from "../constants/nodeListConstants";

const panelNodeList = [
  {
    id: 1,
    name: types.SET_VARIABLES,
    type: types.SET_VARIABLES,
    icon: <SetVariablesIcon/>,
    fav: false,
    createdDate:undefined
  },
  {
    id: 2,
    name: types.NOTIFICATION,
    type: types.NOTIFICATION,
    icon: <NotificationIcon/>,
    fav: false,
    createdDate:undefined
  },
  {
    id: 3,
    name: types.COMBINE,
    type: types.COMBINE,
    icon: <CombineIcon/>,
    fav: false,
    createdDate:undefined
  },
  {
    id: 4,
    name: types.SPLIT,
    type: types.SPLIT,
    icon: <SplitIcon/>,
    fav: false,
    createdDate:undefined
  },
  {
    id: 5,
    name: types.CALCULATE,
    type: types.CALCULATE,
    icon: <CalculateIcon/>,
    fav: false,
    createdDate:undefined
  },
  {
    id: 6,
    name: types.EXCEL_READ,
    type: types.EXCEL_READ,
    icon: <ExcelReadIcon/>,
    fav: false,
    createdDate:undefined
  },
  {
    id: 7,
    name: types.SERIAL_READ,
    type: types.SERIAL_READ,
    icon: <CalculateIcon/>,
    fav: false,
    createdDate:undefined
  },
];
export const nodeListReducer = (state = panelNodeList, {type,payload}) => {
  switch (type) {
    case actionTypes.SET_NODE_LIST:
      return payload;
    case actionTypes.ADD_NODE_TO_FAVORITES:
      return state.map(state=>state.id === payload.id ? {...state,fav:!state.fav} : state);
    default:
      return state;
  }
};
