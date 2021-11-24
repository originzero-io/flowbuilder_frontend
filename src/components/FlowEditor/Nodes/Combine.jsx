import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import NodeIOManager from "./global/NodeIOManager";
const CombineNode = (self) => {
  const [align, setAlign] = useState("vertical");
  console.log("combine-rendered");
  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        ioType="both"
        collapsable={true}
      >
        <NodeIOManager self={self} ioType="target" />
      </NodeGod>
    </>
  );
};

export default CombineNode;
