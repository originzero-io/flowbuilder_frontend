import { getConnectedEdges, isEdge, isNode } from "react-flow-renderer";
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
    nodes: [...nodeArray]
  };
  return data;
};
export const findElementById = (id, elements) => {
  const result = elements.find((element) => element.id === id);
  return result;
};
export const controlEdgeExist = (newConnection,elements) => {
  const { nodes, edges } = getNodesAndEdges(elements);
  const connectedEdges = getConnectedEdges(nodes, edges);
  let exist = false;
  connectedEdges.map(edge => {
    if (edge.source === newConnection.source && edge.target === newConnection.target && edge.sourceHandle === newConnection.sourceHandle && edge.targetHandle === newConnection.targetHandle) {
      exist = true;
    }
  })
  return exist;
};
export const removeEdgeFromArray = (edge, elements) => {
  return elements.filter(els => els.id !== edge.id);
};
