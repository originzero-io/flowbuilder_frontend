import { getConnectedEdges, isEdge, isNode } from "react-flow-renderer";
import uuid from "react-uuid";

export const createNode = (type,position,align,func) => {
  return {
    id: uuid(),
    type,
    position,
    data: {
      label: `${type}`,
      onChange: func,
      targetCount: 1,
      sourceCount: 1,
      align: align,
      expand: false,
      enable: true,
      group: {nodes:[]},
    },
  };
}

export const getNodesAndEdges = (elements) => {
  const edgeArray = [];
  const nodeArray = [];
  elements.map((els) => {
    if (isEdge(els)) {
      return edgeArray.push(els);
    } else {
      return nodeArray.push(els);
    }
  });
  const data = {
    edges: [...edgeArray],
    nodes: [...nodeArray],
  };
  return data;
};
export const findElementById = (id, elements) => {
  const result = elements.find((element) => element.id === id);
  return result;
};
export const isEdgeExist = (newConnection, elements) => {
  const { nodes, edges } = getNodesAndEdges(elements);
  const connectedEdges = getConnectedEdges(nodes, edges);
  let exist = false;
  connectedEdges.map((edge) => {
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
export const removeEdgeFromArray = (edge, elements) => {
  return elements.filter((els) => els.id !== edge.id);
};
export const setSourceColorToEdge = (connection, elements) => {
  const color = elements.find(els => els.id === connection.source).data.group.color;
  const newElements = elements.map((els) => {
    if (els.source === connection.source && els.target === connection.target) {
      return {
        ...els,
        style: {
          ...els.style,
          stroke: color,
        },
      };
    }
    return els;
  });
  return newElements;
};
