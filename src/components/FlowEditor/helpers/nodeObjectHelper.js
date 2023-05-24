import React from "react";
import store from "index";
import NodeUI from "../nodes/NodeUI";

// return {"node_type": NodeComponent}
export const createCustomNodeObject = () => {
  const customNodeObject = {};
  const values = Object.values(NodeUI);
  Object.keys(NodeUI).forEach((k, i) => {
    customNodeObject[k] = values[i].component;
  });
  return customNodeObject;
};

export const createPanelNodeList = () => {
  const entries = Object.entries(NodeUI);
  return entries.map((e, index) => {
    return {
      id: index,
      name: e[0],
      type: e[0],
      icon: React.createElement(e[1].icon),
      fav: false,
      createdDate: undefined,
    };
  });
};

export const getIconComponent = (type) => NodeUI[type].icon;

export const getNodeSkeleton = (type) => {
  const { systemNodes } = store.getState();
  return systemNodes[type];
};
