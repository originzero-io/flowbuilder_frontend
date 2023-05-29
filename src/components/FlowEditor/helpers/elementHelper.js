import uuid from "react-uuid";
import { getNodeSkeleton } from "./nodeObjectHelper";

export const createNode = (type, initialPosition, direction) => ({
  id: `${type}-${uuid()}`,
  type,
  position: initialPosition,
  data: {
    skeleton: getNodeSkeleton(type),
    handles: {
      class: "class1", // triggerAttributes ve handleMechanismi belirler
      triggerAttributes: "ignore",
      handleMechanism: {
        frozenHandles: [], // silinmesine izin verilmeyecek handlelar
        stateHandles: {
          trig: true,
          start: true,
          end: true,
          error: false,
          enable: false,
          disable: false,
          cancel: false,
          clear: false,
          trigHandles: [],
        },
      },
    },
    ui: {
      label: `${type}`,
      direction,
      enable: true,
      group: { _id: 0, color: "gray" },
    },
  },

  // ? Reactflow tarafından eklenenler
  // width,
  // height,
  // selected,
  // positionAbsolute : {x,y},
  // dragging
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
  const group = nodes.find((node) => node.id === connection.source)?.data.ui
    .group;
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
