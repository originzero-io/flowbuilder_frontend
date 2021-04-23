import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";

const ExcelReadNode = (self) => {
  const [align, setAlign] = useState("vertical");

  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        io="source"
        collapsable={false}
      ></NodeGod>
    </>
  );
};

export default ExcelReadNode;
