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
  const result = elements.filter((element) => element.id === id)[0];
  return result;
};
export const controlEdgeExist = (newConnection,elements) => {
  const { nodes, edges } = getNodesAndEdges(elements);
  const connectedEdges = getConnectedEdges(nodes, edges);
  let exist = false;
  connectedEdges.map(c => {
    if (c.source === newConnection.source && c.target === newConnection.target && c.sourceHandle === newConnection.sourceHandle) {
      exist = true;
    }
  })
  return exist;
};
export const removeEdgeFromArray = (edgeArray,elements) => {
  const removeElement = edgeArray.filter(t => t !== null)[0];
  return elements.filter(els => els.id !== removeElement.id);
};
