import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import NodeIOManager from "./global/NodeIOManager";

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
      >
        <NodeIOManager self={self} io="both" />
      </NodeGod>
    </>
  );
};

export default CalculateNode;
