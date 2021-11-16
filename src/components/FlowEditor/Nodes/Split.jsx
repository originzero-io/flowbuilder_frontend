import React, { useState } from "react";
import { getOutgoers } from "react-flow-renderer";
import { useSelector, useDispatch } from "react-redux";
import useDidMountEffect from "../../../utils/useDidMountEffect";
import NodeGod from "./global/NodeGod";
// import { Label } from "./styles";
// import { setElements } from "../../../store/reducers/flow/flowElementsReducer";
import NodeIOManager from "./global/NodeIOManager";
const SplitNode = (self) => {
  const { flowElements } = useSelector((state) => state.activeFlow);
  const elements = flowElements.present;
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const dispatch = useDispatch();
  const [values, setValues] = useState([
    {
      source1: "",
    },
    {
      source2: "",
    },
    {
      source3: "",
    },
  ]);

  let outgoers = getOutgoers(self, elements);

  useDidMountEffect(() => {
    //const data = Object.values(values);
    nodeClass.doSplit(values, self, outgoers);
  }, [values]);
  const [align, setAlign] = useState("vertical");
  return (
    <NodeGod
      self={self}
      align={align}
      setAlign={setAlign}
      ioType="both"
      collapsable={true}
    >
      <NodeIOManager self={self} ioType="source" />
      {/* <input
        name="source1"
        type="number"
        value={values["source1"]}
        className="nodrag nowheel"
        style={{ width: "30%" }}
        onChange={handleChange}
      />
      <input
        name="source2"
        type="number"
        value={values["source2"]}
        className="nodrag nowheel"
        style={{ width: "30%" }}
        onChange={handleChange}
      />
      <input
        name="source3"
        type="number"
        value={values["source3"]}
        className="nodrag nowheel"
        style={{ width: "30%" }}
        onChange={handleChange}
      /> */}
    </NodeGod>
  );
};

export default SplitNode;
