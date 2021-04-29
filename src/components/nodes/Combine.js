import React, { useState } from "react";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../REDUX/actions/flowActions";
import updateNodeHandles from "../../app-global/helpers/updateNodeHandles";
import NodeIOManager from "./global/NodeIOManager";
const CombineNode = (self) => {
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  const [handleCount, setHandleCount] = useState({
    targetCount: 1,
    sourceCount: 1,
  });
  const handleCountChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHandleCount({
      ...handleCount,
      [name]: value,
    });
    const updatedElements = updateNodeHandles(name, value, self, elements);
    dispatch(setElements(updatedElements));
  };

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
        <NodeIOManager self={self} io="source"/>
      </NodeGod>
    </>
  );
};

export default CombineNode;
