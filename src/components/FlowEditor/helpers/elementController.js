import { getConnectedEdges, isEdge, isNode } from "react-flow-renderer";
import uuid from "react-uuid";
import { loadFunctionsToNode } from "./loadFunctionsToNode";

export const createNode = (type,position,align,nodeClass) => {
  return {
    id: uuid(),
    type,
    position,
    data: {
      label: `${type}`,
      onChange: loadFunctionsToNode(type, nodeClass),
      targetCount: 1,
      sourceCount: 1,
      align: align,
      selected: false,
      expand: false,
      enable: true,
      group: { _id: 0, color: null },
    }
  };
}

export const isEdgeExist = (newConnection, edges) => {
  let exist = false;
  edges.map((edge) => {
    if (
      edge.source === newConnection.source &&
      edge.target === newConnection.target &&
      edge.sourceHandle === newConnection.sourceHandle &&
      edge.targetHandle === newConnection.targetHandle
    ) {
      exist = true;
    }
  });
  return exist;
};

export const setSourceNodeColorToEdge = (connection, updatedEdges, nodes) => {
  const group = nodes.find(node => node.id === connection.source)?.data.group;
  const newEdges = updatedEdges.map((edge) => {
    if (edge.source === connection.source && edge.target === connection.target) {
      return {
        ...edge,
        group,
        style: {
          ...edge.style,
          stroke: group.color,
        },
      };
    }
    return edge;
  });
  return newEdges;
}

export const getSelectedNodes = (nodes) => {
  return nodes.filter(node => node.selected === true);
};
