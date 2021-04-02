import { isEdge, isNode } from "react-flow-renderer";
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
