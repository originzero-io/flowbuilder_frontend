const adjustScreen = (workspace,reactFlowInstance) => {
  const fx = workspace.position[0];
  const fy = workspace.position[1];
  const fzoom = workspace.zoom;
  console.log("fx:", fx);
  console.log("fy:", fy);
  console.log("fzoom:", fzoom);
  reactFlowInstance.setTransform({ x: fx, y: fy, zoom: fzoom });
};

export default adjustScreen;
