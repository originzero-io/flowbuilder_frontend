import React from "react";
import NodeGod from "./shared/NodeGod";

const SerialReadNode = (self) => {
  return <NodeGod self={self} collapsable={false} />;
};

export default React.memo(SerialReadNode);
