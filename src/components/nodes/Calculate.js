import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";

const CalculateNode = (self) => {
  const [align, setAlign] = useState("vertical");
  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        io="both"
        collapsable={true}
      ></NodeGod>
    </>
  );
};

export default CalculateNode;
