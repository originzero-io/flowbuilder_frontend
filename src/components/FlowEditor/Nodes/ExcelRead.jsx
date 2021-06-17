import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import NodeIOManager from "./global/NodeIOManager";

const ExcelReadNode = (self) => {
  const [align, setAlign] = useState("vertical");
  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        ioType="source"
        collapsable={true}
      >
        <NodeIOManager self={self} ioType="source"/>
      </NodeGod>
    </>
  );
};

export default ExcelReadNode;
