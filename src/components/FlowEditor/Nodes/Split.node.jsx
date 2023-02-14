import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import NodeIOManager from "./global/NodeIOManager";

const SplitNode = (self) => {
  const [align, setAlign] = useState("vertical");
  return (
    <NodeGod
      self={self}
      align={align}
      setAlign={setAlign}
      ioType="both"
      collapsable={true}
    >
      <NodeIOManager self={self} ioType="source" />
    </NodeGod>
  );
};

export default React.memo(SplitNode);
