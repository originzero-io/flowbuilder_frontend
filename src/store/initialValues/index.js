import React from "react";
import {
  SetVariablesIcon,
  NotificationIcon,
  CombineIcon,
  SplitIcon,
  CalculateIcon,
  ExcelReadIcon,
} from "../../components/FlowEditor/Nodes/global/Icons";
import * as types from "../../components/FlowEditor/Nodes/constant/nodeTypes";
export const panelNodeList = [
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

export const nodeGroups = [
  {
    id: 1,
    name: "group_1",
    color: "#2ecc71",
  },
  {
    id: 2,
    name: "group_2",
    color: "#2980b9",
  },
  {
    id: 3,
    name: "group_3",
    color: "#f39c12",
  },
  {
    id: 4,
    name: "group_4",
    color: "#6c5ce7",
  },
  {
    id: 5,
    name: "group_5",
    color: "tomato",
  },
];

export const panelConfig = {
  activePanel: "Projects",
  activeProject: {},
  copiedElements: []
};

export const flowTemplate = {
  workspace: {
    reactFlowInstance: null,
    position: [0, 0],
    zoom: 1,
    rotateAllPath: "horizontal",
    miniMapDisplay: "visible",
    groupBarDisplay: "hidden",
    edgeType: "bezier",
    theme: "light",
    nodeGroupMenuDisplay: false,
    paneClickPosition: { x: 0, y: 0 },
  },
  elements: [],
  groups: nodeGroups,
};

export const flows = [
  // {
  //   opened:false,
  //   config: {
  //     id: "flow0",
  //     name: "Initial flow",
  //     author: "Anaks",
  //     description: "Sample Flow",
  //     company: "Star Metal",
  //     createdDate: "05-06-2021 10.15",
  //     projectId: "project0",
  //   },
  //   ...flowTemplate,
  // },
];
