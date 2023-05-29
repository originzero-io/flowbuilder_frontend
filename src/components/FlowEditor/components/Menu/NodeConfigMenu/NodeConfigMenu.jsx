import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import { setNodeConfigData } from "store/reducers/flow/flowElementsSlice";
import ConfigParametersForm from "./ConfigParametersForm";
import StateHandlesForm from "./StateHandlesForm";
import TriggerAttributeForm from "./TriggerAttributeForm";
import * as Styled from "./NodeConfigMenu.style";
import HandleCountForm from "./HandleCountForm";

function nodeConfigReducer(node, { type, event }) {
  let newNode;
  switch (type) {
    case "updateConfigParameters":
      newNode = {
        ...node,
        data: {
          ...node.data,
          skeleton: {
            ...node.data.skeleton,
            configParameters: {
              ...node.data.skeleton.configParameters,
              [event.target.name]: event.target.value,
            },
          },
        },
      };
      break;
    case "updateStateHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          handles: {
            ...node.data.handles,
            handleMechanism: {
              ...node.data.handles.handleMechanism,
              stateHandles: {
                ...node.data.handles.handleMechanism.stateHandles,
                [event.target.name]: event.target.checked,
              },
            },
          },
        },
      };
      break;
    case "updateTriggerAttributes":
      newNode = {
        ...node,
        data: {
          ...node.data,
          handles: {
            ...node.data.handles,
            triggerAttributes: event.target.value,
          },
        },
      };
      break;
    case "updateHandleCount":
      newNode = {
        ...node,
        data: {
          ...node.data,
          skeleton: {
            ...node.data.skeleton,
            ioEngine: {
              ...node.data.skeleton.ioEngine,
              [event.target.name]: Number(event.target.value),
            },
          },
        },
      };
      break;
    default:
      throw new Error("There are no action in that name");
  }
  return newNode;
}

export default function NodeConfigMenu({ self }) {
  const [node, nodeConfigDispatch] = useReducer(nodeConfigReducer, self);
  const dispatch = useDispatch();
  const { dynamicInput, dynamicOutput, stateful } = node.data.skeleton.ioEngine;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setNodeConfigData(node));
    dispatch(setModal(false));
  };

  return (
    <div>
      <Styled.Header>Node Configuration Menu</Styled.Header>
      <div style={{ marginBottom: "30px" }}>{self.id}</div>

      <ConfigParametersForm node={node} dispatcher={nodeConfigDispatch} />

      {stateful && (
        <StateHandlesForm node={node} dispatcher={nodeConfigDispatch} />
      )}

      <TriggerAttributeForm node={node} dispatcher={nodeConfigDispatch} />

      {(dynamicInput || dynamicOutput) && (
        <HandleCountForm node={node} dispatcher={nodeConfigDispatch} />
      )}

      <Button onClick={onSubmitHandler}>Save</Button>
    </div>
  );
}
