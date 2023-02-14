import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NodeGod from "./global/NodeGod";
import NodeIOManager from "./global/NodeIOManager";

const ExcelReadNode = (self) => {
  const [align, setAlign] = useState("vertical");
  return (
    <NodeGod
      self={self}
      align={align}
      setAlign={setAlign}
      ioType="source"
      collapsable
    >
      <NodeIOManager self={self} ioType="source" />
    </NodeGod>
  );
};

export default React.memo(ExcelReadNode);
