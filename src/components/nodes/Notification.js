import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import { NodeContent } from "./styles";

const NotificationNode = (self) => {
  const [align, setAlign] = useState("vertical");

  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        ioType="target"
        collapsable={false}
      >
      </NodeGod>
    </>
  );
};

export default NotificationNode;
