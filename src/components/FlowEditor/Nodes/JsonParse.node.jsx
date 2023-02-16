import React from "react";
import NodeGod from "./shared/NodeGod";

const JsonParseNode = (self) => {
  return <NodeGod self={self} collapsable />;
};

export default React.memo(JsonParseNode);
