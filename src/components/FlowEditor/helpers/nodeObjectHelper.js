import React from "react";
import store from "index";
import NodeUI from "../nodes/NodeUI";
import BaseCustomNode from "../nodes/BaseCustom.node";

// return {"node_type": NodeComponent}
export const createCustomNodeObject = () => {
  const customNodeObject = {};
  Object.keys(NodeUI).forEach((k, i) => {
    customNodeObject[k] = BaseCustomNode;
  });
  return customNodeObject;
};

export const createPanelNodeList = () => {
  const entries = Object.entries(NodeUI);
  return entries.map((e, index) => ({
    id: index,
    name: e[0],
    type: e[0],
    category: e[1].category,
    icon: React.createElement(e[1].icon),
    fav: false,
    createdDate: undefined,
  }));
};

export const getIconComponent = (type) => NodeUI[type].icon;

export const getNodeData = (type) => {
  const { systemNodes } = store.getState();
  return systemNodes[type];
};
