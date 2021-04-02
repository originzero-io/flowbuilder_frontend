import React from "react";
import ReactTooltip from "react-tooltip";

export default function Tooltip({id,place,type,others}) {
  return (
    <>
      <ReactTooltip
        id={id}
        place={place}
        type={type}
        effect="solid"
        delayHide={120}
        delayShow={50}
        {...others}
      />
    </>
  );
}
