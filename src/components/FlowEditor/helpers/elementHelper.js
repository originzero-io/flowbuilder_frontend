import uuid from "react-uuid";
import { getNodeEngineData } from "./nodeTypeHelper";

export const createNode = (type, position, align) => ({
  id: `${type}-${uuid()}`,
  type,
  position,
  data: {
    engine: getNodeEngineData(type),
    label: `${type}`,
    align,
    expand: false,
    enable: true,
    group: { _id: 0, color: null },
  },
});

export const isEdgeExist = (newConnection, edges) =>
  edges.some(
    (edge) =>
      edge.source === newConnection.source &&
      edge.target === newConnection.target &&
      edge.sourceHandle === newConnection.sourceHandle &&
      edge.targetHandle === newConnection.targetHandle,
  );

export const setSourceNodeColorToEdge = (connection, updatedEdges, nodes) => {
  const group = nodes.find((node) => node.id === connection.source)?.data.group;
  const newEdges = updatedEdges.map((edge) => {
    if (
      edge.source === connection.source &&
      edge.target === connection.target
    ) {
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
};

export const getSelectedNodes = (nodes) =>
  nodes.filter((node) => node.selected === true);
