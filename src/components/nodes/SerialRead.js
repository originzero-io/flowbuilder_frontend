import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import NodeIOManager from "./global/NodeIOManager";

const SerialReadNode = (self) => {
  const [align, setAlign] = useState("vertical");

  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        io="source"
        collapsable={false}
      >
        <NodeIOManager self={self} io="source" />
      </NodeGod>
    </>
  );
};

export default SerialReadNode;
