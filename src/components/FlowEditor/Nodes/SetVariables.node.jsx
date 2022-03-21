import React, { useEffect, useState } from "react";
import { getOutgoers } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { getNodesAndEdges } from "../helpers/elementController";
import useActiveFlow from "../../../hooks/useActiveFlow";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import NodeGod from "./global/NodeGod";
import NodeIOmanager from "./global/NodeIOManager";
import { Label } from "./Nodes.style";

const SetVariables = React.memo((self) => {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const { flowElements } = useActiveFlow();
  const elements = flowElements.present;
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
  

  //console.log("self:", self);
  return (
    <>
      <NodeGod
        self={self}
        align={align}
        setAlign={setAlign}
        ioType="source"
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
          <input type="checkbox" onChange={checkboxChange} value={checked} />
        </div>
        <NodeIOmanager self={self} ioType="source"/>
      </NodeGod>
    </>
  );
});

export default SetVariables;
