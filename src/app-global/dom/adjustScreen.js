const adjustScreen = (flow, reactFlowInstance) => {
  const fx = flow.position[0];
  const fy = flow.position[1];
  const fzoom = flow.zoom;
  reactFlowInstance.setTransform({ x: fx, y: fy, zoom: fzoom });
};

export default adjustScreen;
