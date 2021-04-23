import React, { useState } from "react";
import notificationIcon from "../../assets/icons/Notification.png";
import NodeGod from "./global/NodeGod";
import { useSelector, useDispatch } from "react-redux";

const SerialReadNode = (self) => {
  
  const {flagColor} = useSelector((state) => state.guiConfigReducer);

  const [align, setAlign] = useState("vertical");

  return (
    <>
      <NodeGod
        self={self}
        iconSrc={notificationIcon}
        flagColor={flagColor}
        align={align}
        setAlign={setAlign}
        io="source"
        collapsable={false}
      ></NodeGod>
    </>
  );
};

export default SerialReadNode;
