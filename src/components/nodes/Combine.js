import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../REDUX/actions/flowActions";
import updateNodeHandles from "../../app-global/helpers/updateNodeHandles";
import NodeIOManager from "./global/NodeIOManager";
const CombineNode = (self) => {
  const elements = useSelector((state) => state.elementReducer);
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
