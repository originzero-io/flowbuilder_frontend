import React from "react";
import NodeGod from "./shared/NodeGod";

const CombineNode = (self) => {
  // console.log("combine-rendered");
  return <NodeGod self={self} collapsable />;
};

export default React.memo(CombineNode);
