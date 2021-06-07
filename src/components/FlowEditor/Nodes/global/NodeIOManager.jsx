import React, { useState } from "react";
import { Label } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import updateNodeHandles from "../../../../app-global/helpers/updateNodeHandles";
import { setElements } from "../../../../store/actions/elementsActions";
import PropTypes from "prop-types"
export default function NodeIOManager({ self, ioType }) {
  const elements = useSelector((state) => state.elementReducer).present;
  const dispatch = useDispatch();
  const [handleCount, setHandleCount] = useState({
    targetCount: self.data.targetCount,
    sourceCount: self.data.sourceCount,
  });
  const handleCountChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setHandleCount({
      ...handleCount,
      [name]: value,
    });
    const updatedElements = updateNodeHandles(name, value, self, elements);
    dispatch(setElements(updatedElements));
  };
  return (
    <>
      {ioType === "both" ? (
        <>
          <Label>Target Length</Label>
          <input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={handleCount.targetCount}
            onChange={handleCountChange}
          />
          <Label>Source Length</Label>
          <input
            type="number"
            name="sourceCount"
            min={1}
            className="nodrag nowheel"
            value={handleCount.sourceCount}
            onChange={handleCountChange}
          />
        </>
      ) : ioType === "target" ? (
        <>
          <Label>Target Length</Label>
          <input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={handleCount.targetCount}
            onChange={handleCountChange}
          />
        </>
      ) : (
        ioType === "source" && (
          <>
            <Label>Source Length</Label>
            <input
              type="number"
              name="sourceCount"
              min={1}
              className="nodrag nowheel"
              value={handleCount.sourceCount}
              onChange={handleCountChange}
            />
          </>
        )
      )}
    </>
  );
}

NodeIOManager.propTypes = {
  self: PropTypes.object.isRequired,
  ioType:PropTypes.string.isRequired
}