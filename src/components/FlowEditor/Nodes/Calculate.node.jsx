import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
// import { useSelector, useDispatch } from "react-redux";
import NodeIOManager from "./global/NodeIOManager";

const CalculateNode = (self) => {
  const [align, setAlign] = useState("vertical");
  console.log("calculate rendered");
  return (
    <NodeGod
      self={self}
      align={align}
      setAlign={setAlign}
      ioType="both"
      collapsable
    >
      <NodeIOManager self={self} ioType="both" />
    </NodeGod>
  );
};

export default React.memo(CalculateNode);
