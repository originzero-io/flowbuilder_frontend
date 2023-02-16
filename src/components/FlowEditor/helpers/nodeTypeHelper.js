import React from "react";
import Nodes from "../Nodes";

// return {"node_type": NodeComponent}
export const createCustomNodeObject = () => {
  const customNodeObject = {};
  const values = Object.values(Nodes);
  Object.keys(Nodes).forEach((k, i) => {
    customNodeObject[k] = values[i].ui.component;
  });
  return customNodeObject;
};

export const createPanelNodeList = () => {
  const entries = Object.entries(Nodes);
  return entries.map((e, index) => {
    return {
      id: index,
      name: e[0],
      type: e[0],
      icon: React.createElement(e[1].ui.icon),
      fav: false,
      createdDate: undefined,
    };
  });
};

export const getIconComponent = (type) => Nodes[type].ui.icon;
export const getNodeEngineData = (type) => Nodes[type].engine;
