import React from "react";
import {useDispatch} from "react-redux"
import { rotateNode } from "../../../../store/reducers/flow/flowElementsReducer";
import { HorizontalToVerticalIcon, VerticalToHorizontalIcon } from "./Icons";
import PropTypes from "prop-types"
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

RotateButton.propTypes = {
  self: PropTypes.object.isRequired
}
