import React from "react";
import { HorizontalToVerticalIcon,VerticalToHorizontalIcon } from "../SvgIcons";
export default function RotateButton({ align, setAlign }) {
  const rotateHandle = () => {
    if (align === "vertical") {
      setAlign("horizontal");
    } else {
      setAlign("vertical");
    }
  };
  return (
    <div onClick={rotateHandle}>
      {
        align === "horizontal" ? <HorizontalToVerticalIcon/> : <VerticalToHorizontalIcon/>
      }
    </div>
  );
}
