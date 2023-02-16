import React from "react";
import NodeGod from "./shared/NodeGod";

const SplitNode = (self) => {
  return <NodeGod self={self} collapsable />;
};

export default React.memo(SplitNode);
