import React, { useContext, useState } from "react";
import notificationIcon from "../../assets/icons/Notification.png";
import NodeGod from "./NodeGod";
import { useSelector, useDispatch } from "react-redux";

const CalculateNode = (self) => {
  
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
        io="both"
        collapsable={true}
        >
      </NodeGod>
    </>
  );
};

export default CalculateNode;
