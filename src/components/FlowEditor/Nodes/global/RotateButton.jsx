import React from "react";
import {useDispatch} from "react-redux"
import { rotateNode } from "store/reducers/flow/flowElementsSlice";
import { HorizontalToVerticalIcon, VerticalToHorizontalIcon } from "./Icons";
import PropTypes from "prop-types"

const propTypes = {
  self: PropTypes.object.isRequired
};
export default function RotateButton({ self }) {
  const dispatch = useDispatch();
  const rotateHandle = () => {
    dispatch(rotateNode(self));
  };
  return (
    <div onClick={rotateHandle}>
      {
        self.data.align === "horizontal" ? <HorizontalToVerticalIcon/> : <VerticalToHorizontalIcon/>
      }
    </div>
  );
}

RotateButton.propTypes = propTypes;
