import React, { useState } from "react";
import collapseIcon from "../../../assets/icons/collapseIcon.png";
import expandIcon from "../../../assets/icons/expandIcon.png";

export default function CollapseButton({expand,expandMenu}) {
  return (
    <div onClick={expandMenu} style={{ marginTop: "-5px",marginRight:'10px'}}>
      <img
        src={expand === true ? collapseIcon : expandIcon}
        alt="noimg"
        width="12"
        height="7"
        draggable={false}
        style={{filter:'hue-rotate(30deg)'}}
      />
    </div>
  );
}
