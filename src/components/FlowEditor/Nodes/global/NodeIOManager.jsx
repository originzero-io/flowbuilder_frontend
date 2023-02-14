import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNodeHandles } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import { Label } from "../Nodes.style";

const propTypes = {
  self: PropTypes.object.isRequired,
  ioType: PropTypes.string.isRequired,
};
export default function NodeIOManager({ self, ioType }) {
  const dispatch = useDispatch();
  const [handleCount, setHandleCount] = useState({
    targetCount: self.data.targetCount,
    sourceCount: self.data.sourceCount,
  });
  const handleCountChange = (e) => {
    const { name } = e.target;
    const value = Number(e.target.value);
    setHandleCount({
      ...handleCount,
      [name]: value,
    });
    dispatch(updateNodeHandles({ self, name, value }));
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

NodeIOManager.propTypes = propTypes;
