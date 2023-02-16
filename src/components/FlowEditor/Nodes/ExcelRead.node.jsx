import React from "react";
import NodeGod from "./shared/NodeGod";

const ExcelReadNode = (self) => {
  return <NodeGod self={self} collapsable />;
};

export default React.memo(ExcelReadNode);
