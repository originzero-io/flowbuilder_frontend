import React from "react";
import {useDispatch} from "react-redux"
import { rotateNode } from "../../../REDUX/actions/elementsActions";
import { HorizontalToVerticalIcon,VerticalToHorizontalIcon } from "../../nodes/global/icons";
export default function RotateButton({ self }) {
  const dispatch = useDispatch();
  const rotateHandle = () => {
    const currentAlign = self.data.align;
    const newPath = currentAlign === "horizontal" ? "vertical" : "horizontal"
    dispatch(rotateNode(self,newPath))
  };
  return (
    <div onClick={rotateHandle}>
      {
        self.data.align === "horizontal" ? <HorizontalToVerticalIcon/> : <VerticalToHorizontalIcon/>
      }
    </div>
  );
}
