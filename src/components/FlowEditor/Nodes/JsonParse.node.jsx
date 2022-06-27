import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import NodeIOManager from "./global/NodeIOManager";
const JsonParseNode = (self) => {
  const [align, setAlign] = useState("vertical");
  console.log("json-parse-rendered");
  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        ioType="both"
        collapsable={true}
      >
        {/* <NodeIOManager self={self} ioType="both" /> */}
      </NodeGod>
    </>
  );
};

export default React.memo(JsonParseNode);
