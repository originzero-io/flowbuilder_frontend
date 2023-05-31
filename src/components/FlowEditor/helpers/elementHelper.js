import uuid from "react-uuid";
import { getNodeSkeleton } from "./nodeObjectHelper";

// const trigHandles = [{ name: "trig1", active: true }];

export const createNode = (type, initialPosition) => {
  const nodeSkeleton = getNodeSkeleton(type);
  return {
    id: `${type}-${uuid()}`,
    type,
    position: initialPosition,
    data: {
      skeleton: {
        ...nodeSkeleton,
        trigHandles: {
          trig1: false,
          trig2: true,
        },
        stateHandles: {
          ...nodeSkeleton?.stateHandles,
          inputs: {
            enable: false,
            disable: false,
            ...nodeSkeleton?.stateHandles?.inputs,
          },
        },
      },
      triggerAttributes: "ignore",
      frozenHandles: [], // silinmesine izin verilmeyecek handlelar
      preferencesClass: "class1", // triggerAttributes ve handleMechanismi belirler
      ui: {
        label: `${type}`,
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
  };
};

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
