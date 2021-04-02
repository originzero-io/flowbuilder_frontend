import React, { useContext, useEffect, useState } from "react";
import { getOutgoers, useUpdateNodeInternals } from "react-flow-renderer";
import setVariable from "../../assets/icons/Set_Variables.png";
import { getNodesAndEdges } from "../../globals/helpers/elementController";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import NodeGod from "./NodeGod";
import { Label } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../REDUX/actions/flowActions";
import updateNodeHandles from "../../globals/helpers/updateNodeHandles"

const SetVariables = (self) => {
  const flagColor = useSelector((state) => state.flagColorReducer);
  const elements = useSelector((state) => state.elementReducer);
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const dispatch = useDispatch();
  const [values, setValues] = useState([
    {
      source1: "Anaks",
    },
  ]);
  const [text, setText] = useState("Anaks");
  const [checked, setChecked] = useState(false);
  let outgoers = getOutgoers(self, elements);
  const checkboxChange = (e) => {
    setChecked(!checked);
    const { edges } = getNodesAndEdges(elements);
    const mySources = edges.filter((edge) => edge.source === self.id);
    const handles = mySources.map((s) => s.sourceHandle);
    //console.log("my-handles", handles);
    const src = handles.map((h) => {
      return { [h]: text };
    });
    //-console.log("src:", src);
    if (src.length > 0) {
      setValues([...src]);
    }
  };
  const textChange = (e) => {
    setText(e.target.value);
  };

  const [align, setAlign] = useState(self.data.align);
  
  useEffect(() => {
    // const { edges } = getNodesAndEdges(elements);
    // const mySources = edges.filter((edge) => edge.source === self.id);
    // const handles = mySources.map((s) => s.sourceHandle);
    // console.log("my-elements", handles);
    // const src = handles.map((h) => {
    //   return { [h]: text };
    // });
    // console.log("src:", src);
    // if (src.length > 0) {
    //   setValues([...src]);
    // }
  }, [self.data.sourceCount, checked, text]);

  useDidMountEffect(() => {
    nodeClass.doInput(values, self, outgoers);
  }, [values]);

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

  return (
    <>
      <NodeGod
        self={self}
        iconSrc={setVariable}
        flagColor={flagColor}
        align={align}
        setAlign={setAlign}
        io="source"
        collapsable={true}
      >
        <Label>Payload</Label>
        <div>
          <input
            type="text"
            className="nodrag nowheel"
            value={text}
            onChange={textChange}
          />
          <input type="checkbox" onChange={checkboxChange} />
        </div>
        <Label>Source Length</Label>
        <input
          type="number"
          name="sourceCount"
          min={1}
          className="nodrag nowheel"
          value={handleCount.sourceCount}
          onChange={handleCountChange}
          style={{ width: "145px" }}
        />
      </NodeGod>
    </>
  );
};

export default SetVariables;
