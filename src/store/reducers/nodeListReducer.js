import * as actionTypes from "../constants/nodeListConstants";
import * as types from "../../components/FlowEditor/Nodes/constant/nodeTypes";
import React from "react";
import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "../../components/FlowEditor/Nodes/global/Icons";
const panelNodeList = [
  {
    id: 1,
    name: types.SET_VARIABLES,
    type: types.SET_VARIABLES,
    icon: <SetVariablesIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 2,
    name: types.NOTIFICATION,
    type: types.NOTIFICATION,
    icon: <NotificationIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 3,
    name: types.COMBINE,
    type: types.COMBINE,
    icon: <CombineIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 4,
    name: types.SPLIT,
    type: types.SPLIT,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 5,
    name: types.CALCULATE,
    type: types.CALCULATE,
    icon: <CalculateIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 6,
    name: types.EXCEL_READ,
    type: types.EXCEL_READ,
    icon: <ExcelReadIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 7,
    name: types.SERIAL_READ,
    type: types.SERIAL_READ,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
];
const nodeListReducer = (state = panelNodeList, {type,payload}) => {
  switch (type) {
    case actionTypes.SET_NODE_LIST:
      return payload;
    case actionTypes.ADD_NODE_TO_FAVORITES:
      return state.map(state=>state.id === payload.id ? {...state,fav:!state.fav} : state);
    default:
      return state;
  }
};
export default nodeListReducer;


export const setNodeList = (data) => ({
  type: actionTypes.SET_NODE_LIST,
  payload: data
});
export const addNodeToFavorites = (node) => ({
  type: actionTypes.ADD_NODE_TO_FAVORITES,
  payload: node
});