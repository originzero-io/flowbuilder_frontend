import React from "react";
import NodeGod from "./shared/NodeGod";

const HttpRequestNode = (self) => {
  return <NodeGod self={self} collapsable />;
};

export default React.memo(HttpRequestNode);
