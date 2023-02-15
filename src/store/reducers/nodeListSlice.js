import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as types from "../../components/FlowEditor/Nodes/constant/nodeTypes";
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
    name: types.TRIGGER,
    type: types.TRIGGER,
    icon: <SetVariablesIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: "1xxx",
    name: types.CONSTANT,
    type: types.CONSTANT,
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
    id: "1299",
    name: types.EXCEL_WRITE,
    type: types.EXCEL_WRITE,
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
  {
    id: 8,
    name: types.HTTP_REQUEST,
    type: types.HTTP_REQUEST,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 9,
    name: types.JSON_PARSE,
    type: types.JSON_PARSE,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 10,
    name: types.CSV_PARSE,
    type: types.CSV_PARSE,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 11,
    name: types.XML_PARSE,
    type: types.XML_PARSE,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 12,
    name: types.JOIN_ARRAY,
    type: types.JOIN_ARRAY,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 13,
    name: types.SPLICE_ARRAY,
    type: types.SPLICE_ARRAY,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 14,
    name: types.SORT_ARRAY,
    type: types.SORT_ARRAY,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 15,
    name: types.MIN_ARRAY,
    type: types.MIN_ARRAY,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 16,
    name: types.MAX_ARRAY,
    type: types.MAX_ARRAY,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 17,
    name: types.TCP_IN,
    type: types.TCP_IN,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 18,
    name: types.TCP_OUT,
    type: types.TCP_OUT,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 19,
    name: types.MODBUS_READ,
    type: types.MODBUS_READ,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 20,
    name: types.MODBUS_WRITE,
    type: types.MODBUS_WRITE,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 21,
    name: types.S7_READ,
    type: types.S7_READ,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 22,
    name: types.S7_WRITE,
    type: types.S7_WRITE,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 23,
    name: types.SEND_SMS,
    type: types.SEND_SMS,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 24,
    name: types.SEND_MAIL,
    type: types.SEND_MAIL,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
  {
    id: 25,
    name: types.FILE,
    type: types.FILE,
    icon: <SplitIcon />,
    fav: false,
    createdDate: undefined,
  },
];

export const nodeListSlice = createSlice({
  name: "nodeListReducer",
  initialState: panelNodeList,
  reducers: {
    setNodeList(state, { payload }) {
      return payload;
    },
    addNodeToFavorites(state, { payload }) {
      return state.map((node) =>
        node.id === payload.id ? { ...node, fav: !node.fav } : node,
      );
    },
  },
});

export const { setNodeList, addNodeToFavorites } = nodeListSlice.actions;
export default nodeListSlice.reducer;
