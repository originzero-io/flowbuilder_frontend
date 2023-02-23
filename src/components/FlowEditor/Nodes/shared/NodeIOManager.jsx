import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNodeHandles } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import * as Styled from "./Node.style";

const propTypes = {
  self: PropTypes.object.isRequired,
  ioType: PropTypes.string.isRequired,
};
export default function NodeIOManager({ self }) {
  const { sourceCount, targetCount, ioType } = self.data.engine;

  const dispatch = useDispatch();
  const [handleCount, setHandleCount] = useState({
    targetCount,
    sourceCount,
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
          <Styled.Label>Target Length</Styled.Label>
          <input
            type="number"
            name="targetCount"
            min={1}
            className="nodrag nowheel"
            value={handleCount.targetCount}
            onChange={handleCountChange}
          />
          <Styled.Label>Source Length</Styled.Label>
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
          <Styled.Label>Target Length</Styled.Label>
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
            <Styled.Label>Source Length</Styled.Label>
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
