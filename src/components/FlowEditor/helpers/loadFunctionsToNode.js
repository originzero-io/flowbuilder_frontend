export const loadFunctionsToNode = (type, nodeClass) => {
  return nodeClass[`do${type}`];
};
