import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNodeHandles } from "store/reducers/flow/flowElementsSlice";
import PropTypes from "prop-types";
import * as Styled from "./Node.style";

const propTypes = {
  self: PropTypes.object.isRequired,
  ioType: PropTypes.string.isRequired,
};
export default function NodeIOManager({ self, nodeInputs, setNodeInputs }) {
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
  const onChangeNodeInputs = (e) => {
    setNodeInputs({
      ...nodeInputs,
      [e.target.name]: e.target.checked,
    });
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
      <NodeInput name="state_stop">
        <input
          type="checkbox"
          name="state_stop"
          checked={nodeInputs.state_stop}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
      <NodeInput name="state_trig">
        <input
          type="checkbox"
          name="state_trig"
          checked={nodeInputs.state_trig}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
      <NodeInput name="state_start">
        <input
          type="checkbox"
          name="state_start"
          checked={nodeInputs.state_start}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
      <NodeInput name="state_end">
        <input
          type="checkbox"
          name="state_end"
          checked={nodeInputs.state_end}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
      <NodeInput name="state_error">
        <input
          type="checkbox"
          name="state_error"
          checked={nodeInputs.state_error}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
      <NodeInput name="clear">
        <input
          type="checkbox"
          name="clear"
          checked={nodeInputs.clear}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
      <NodeInput name="whatever">
        <input
          type="checkbox"
          name="whatever"
          checked={nodeInputs.whatever}
          onChange={onChangeNodeInputs}
        />
      </NodeInput>
    </>
  );
}

function NodeInput({ children, name }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <div style={{ color: "whitesmoke" }}>{name}</div>
      {children}
    </div>
  );
}

NodeIOManager.propTypes = propTypes;
