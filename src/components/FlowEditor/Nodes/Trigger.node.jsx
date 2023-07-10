import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useActiveFlow from "utils/hooks/useActiveFlow";
import NodeGod from "./shared/NodeGod";
import * as Styled from "./shared/Node.style";
import { Button } from "antd";
import { MdPlayCircleOutline } from "react-icons/md";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import notificationHelper from "utils/ui/notificationHelper";

const Trigger = React.memo((self) => {
  const [checked, setChecked] = useState(false);

  const checkboxChange = (e) => {
    setChecked(!checked);
  };
  const textChange = (e) => {
    setText(e.target.value);
  };
  const startTrig = (e) => {
    notificationHelper.success("Node is trigged...");
    flowExecutorEvent.startByTrigger(self.id);
  };
  return (
    <NodeGod self={self} collapsable>
      {/* <input type="checkbox" onChange={checkboxChange} value={checked} /> */}
      <Button
        onClick={startTrig}
        type="primary"
        shape="round"
        icon={<MdPlayCircleOutline />}
      />
    </NodeGod>
  );
});

export default React.memo(Trigger);
