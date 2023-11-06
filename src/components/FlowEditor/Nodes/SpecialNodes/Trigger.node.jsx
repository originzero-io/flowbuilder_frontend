import { Button } from "antd";
import React from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import NodeGod from "../shared/NodeGod";

const Trigger = ({ self }) => {
  const startTrig = () => {
    flowExecutorEvent.startByTrigger(self);
  };
  return (
    <NodeGod self={self}>
      {/* <Button onClick={startTrig} type="primary" shape="round" icon={<MdPlayCircleOutline />} /> */}
      {/* <MdPlayCircleOutline onClick={startTrig} style={{ color: "#D086EB", fontSize: "40px" }} /> */}
      <AiFillPlayCircle onClick={startTrig} style={{ color: "#65cd1a", fontSize: "40px" }} />
    </NodeGod>
  );
};
export default React.memo(Trigger);
