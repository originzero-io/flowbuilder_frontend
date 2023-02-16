import React from "react";
import NodeGod from "./shared/NodeGod";

const CalculateNode = (self) => {
  return <NodeGod self={self} collapsable />;
};

export default React.memo(CalculateNode);
