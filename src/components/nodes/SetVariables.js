import React, { useContext, useEffect, useState } from "react";
import { getOutgoers, useUpdateNodeInternals } from "react-flow-renderer";
import { getNodesAndEdges } from "../../app-global/helpers/elementController";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import NodeGod from "./global/NodeGod";
import { Label } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { setElements } from "../../REDUX/actions/elementsActions";
import updateNodeHandles from "../../app-global/helpers/updateNodeHandles"
import NodeIOmanager from "./global/NodeIOManager";

const SetVariables = (self) => {
  const elements = useSelector((state) => state.elementReducer).present;
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const nodeGroups = useSelector((state) => state.nodeGroupsReducer);
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
};

export default SetVariables;
