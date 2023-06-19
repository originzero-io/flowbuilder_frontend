export const isAllHandlesConnected = () => {};

export const checkIfTriggerNode = (nodes) => {
  return nodes.some((node) => node.type === "TRIGGER");
};
export const getFunctionalNodes = (nodes) => {
  return nodes.filter(
    (node) => node.type !== "CONSTANT" && node.type !== "TRIGGER",
  );
};

// ? nodun value girişlerine yapılmış bağlantıları verir
export const getMyConnectedValueEdges = (node, edges) => {
  const myValueEdges = edges.filter(
    (edge) =>
      edge.target === node.id &&
      !edge.targetHandle.includes("trig_") &&
      !edge.targetHandle.includes("status_"),
  );

  // ? Aynı inputa yapılmış olan bağlantıları temizler. Duplice bağlantıları kaldırır
  const myNonDuplicatedValueEdges = myValueEdges.filter(
    (edge, index) =>
      myValueEdges.findIndex(
        (item) => item.targetHandle === edge.targetHandle,
      ) === index,
  );

  return myNonDuplicatedValueEdges;
};

export const checkUnconnectedNodes = (functionalNodes, edges) => {
  const unConnectedNodes = [];
  functionalNodes.forEach((node) => {
    const inputCount = Object.keys(node.data.inputParameters).length;
    const myValueEdges = getMyConnectedValueEdges(node, edges).length;
    if (inputCount > myValueEdges) {
      unConnectedNodes.push(node);
    }
  });
  const existNotConnectedNodes = unConnectedNodes.length > 0;
  return {
    exist: existNotConnectedNodes,
    nodes: unConnectedNodes,
  };
};