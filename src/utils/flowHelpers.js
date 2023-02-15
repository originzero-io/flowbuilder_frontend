import { getIncomers, getOutgoers } from "reactflow";
import { selectElements } from "store/reducers/flow/flowElementsSlice";
import { store } from "../index";

export function backendFlowDataBuilder(flowId, elements) {
  return {
    flowId,
    nodes: elements.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: {
        label: node.data.label,
        enable: node.data.enable,
        targetCount: node.data.targetCount,
        sourceCount: node.data.sourceCount,
      },
    })),
    edges: elements.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      sourceHandle: edge.sourceHandle,
      target: edge.target,
      targetHandle: edge.targetHandle,
      data: edge.data,
    })),
  };
}

export function findNodeById(nodeId, elements) {
  return elements.nodes.find((node) => node.id === nodeId);
}
export function isConnectionCyclic(elements, params) {
  const { source, target } = params;
  const dependencyArray = [];
  const sourceNode = findNodeById(source, elements);
  addIncomersToArray(sourceNode, elements, dependencyArray);
  store.dispatch(selectElements(dependencyArray));
  return dependencyArray.some((d) => d.id === target);
}

function addIncomersToArray(node, elements, dependencyArray) {
  const { nodes, edges } = elements;
  const currentNodeIncomers = getIncomers(node, nodes, edges);
  if (currentNodeIncomers.length === 0) {
  } else {
    currentNodeIncomers.forEach((childIncomer) => {
      dependencyArray.push(childIncomer);
      addIncomersToArray(childIncomer, elements, dependencyArray);
    });
  }
}
