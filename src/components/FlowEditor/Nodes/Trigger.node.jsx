import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useActiveFlow from "utils/hooks/useActiveFlow";
import NodeGod from "./shared/NodeGod";
import { Label } from "./shared/Node.style";

const Trigger = React.memo((self) => {
  const [values, setValues] = useState([
    {
      source1: "Anaks",
    },
  ]);
  const [text, setText] = useState("Anaks");
  const [checked, setChecked] = useState(false);

  const checkboxChange = (e) => {
    setChecked(!checked);
    // const { edges } = getNodesAndEdges(elements);
    // const mySources = edges.filter((edge) => edge.source === self.id);
    // const handles = mySources.map((s) => s.sourceHandle);
    // //console.log("my-handles", handles);
    // const src = handles.map((h) => {
    //   return { [h]: text };
    // });
    // //-console.log("src:", src);
    // if (src.length > 0) {
    //   setValues([...src]);
    // }
  };
  const textChange = (e) => {
    setText(e.target.value);
  };
  return (
    <NodeGod self={self} collapsable>
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
    </NodeGod>
  );
});

export default React.memo(Trigger);
