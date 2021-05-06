import React from "react";
import ReactTooltip from "react-tooltip";
import {useSelector} from "react-redux"
export default function Tooltip({ id, place, others }) {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  return (
    <>
      <ReactTooltip
        id={id}
        place={place}
        type={theme==="dark" ? "light" : "dark"}
        effect="solid"
        delayHide={120}
        delayShow={50}
        className="custom-tooltip"
        {...others}
      />
    </>
  );
}
