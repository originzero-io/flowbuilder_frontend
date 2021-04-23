import React, { useContext, useState } from "react";
import combineIcon from "../../assets/icons/Combine.png";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "./styles";
import { setElements } from "../../REDUX/actions/flowActions";
import updateNodeHandles from "../../app-global/helpers/updateNodeHandles"
const CombineNode = (self) => {
  const elements = useSelector((state) => state.elementReducer);
  const {flagColor} = useSelector((state) => state.guiConfigReducer);
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
    const updatedElements = updateNodeHandles(name, value,self, elements);
    dispatch(setElements(updatedElements))
  };

  const [align, setAlign] = useState("vertical");

  return (
    <>
      <NodeGod
        self={self}
        iconSrc={combineIcon}
        flagColor={flagColor}
        align={align}
        setAlign={setAlign}
        io="both"
        collapsable={true}
      >
        <Label>Target Length</Label>
        <input
          type="number"
          name="targetCount"
          min={1}
          className="nodrag nowheel"
          value={handleCount.targetCount}
          onChange={handleCountChange}
        />
        <Label>Source Length</Label>
        <input
          type="number"
          name="sourceCount"
          min={1}
          className="nodrag nowheel"
          value={handleCount.sourceCount}
          onChange={handleCountChange}
        />
      </NodeGod>
    </>
  );
};

export default CombineNode;
