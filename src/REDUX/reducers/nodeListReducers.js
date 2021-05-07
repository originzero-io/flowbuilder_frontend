import * as types from "../../components/nodes/constant/nodeTypes";
import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "../../components/global/SvgIcons";
import * as actionTypes from "../constants/nodeListConstants";

const panelNodeList = [
  {
    id: 1,
    name: types.SET_VARIABLES,
    icon: <SetVariablesIcon/>,
    fav: false,
  },
  {
    id: 2,
    name: types.NOTIFICATION,
    icon: <NotificationIcon/>,
    fav: false,
  },
  {
    id: 3,
    name: types.COMBINE,
    icon: <CombineIcon/>,
    fav: false,
  },
  {
    id: 4,
    name: types.SPLIT,
    icon: <SplitIcon/>,
    fav: false,
  },
  {
    id: 5,
    name: types.CALCULATE,
    icon: <CalculateIcon/>,
    fav: false,
  },
  {
    id: 6,
    name: types.EXCEL_READ,
    icon: <ExcelReadIcon/>,
    fav: false,
  },
  {
    id: 7,
    name: types.SERIAL_READ,
    icon: <CalculateIcon/>,
    fav: false,
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
