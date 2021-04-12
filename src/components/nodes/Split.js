import React, { useContext, useState } from "react";
import { getOutgoers } from "react-flow-renderer";
import {useSelector,useDispatch} from "react-redux"
import splitIcon from "../../assets/icons/Split.png";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import NodeGod from "./NodeGod";
import { Label } from "./styles";
import { setElements } from "../../REDUX/actions/flowActions";
import updateNodeHandles from "../../app-global/helpers/updateNodeHandles"
const SplitNode = (self) => {
  const flagColor = useSelector((state) => state.flagColorReducer);
  const elements = useSelector((state) => state.elementReducer);
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
    dispatch(setElements(updatedElements))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues([{ [name]: Number(value) }]);
  };
  useDidMountEffect(() => {
    //const data = Object.values(values);
    nodeClass.doSplit(values, self, outgoers);
  }, [values]);
  const [align, setAlign] = useState("vertical");
  return (
    <NodeGod
      self={self}
      iconSrc={splitIcon}
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
