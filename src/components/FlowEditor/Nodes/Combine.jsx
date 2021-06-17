import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../../store/actions/elementsActions";
import NodeIOManager from "./global/NodeIOManager";
const CombineNode = (self) => {
  const { elementReducer } = useSelector((state) => state.activeFlowReducer);
  const elements = elementReducer.present;
  const dispatch = useDispatch();
  const [align, setAlign] = useState("vertical");
  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        ioType="both"
        collapsable={true}
      >
        <NodeIOManager self={self} ioType="target"/>
      </NodeGod>
    </>
  );
};

export default CombineNode;
