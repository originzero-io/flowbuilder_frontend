import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { setModal } from "store/reducers/componentSlice";
import { setNodeConfigData } from "store/reducers/flow/flowElementsSlice";
import ConfigParametersForm from "./ConfigParametersForm";
import StatusHandlesForm from "./StatusHandlesForm";
import TriggerForm from "./TriggerForm";
import * as Styled from "./NodeConfigMenu.style";
import HandleCountForm from "./HandleCountForm";
import FrozenHandlesForm from "./FrozenHandlesForm";
import IncomersOutgoers from "./IncomersOutgoers";

function nodeConfigReducer(node, { type, payload }) {
  let newNode;
  switch (type) {
    case "loadNode":
      newNode = payload;
      break;
    case "updateConfigParameters":
      newNode = {
        ...node,
        data: {
          ...node.data,
          configParameters: {
            ...node.data.configParameters,
            [payload.target.name]: payload.target.value,
          },
        },
      };
      break;
    case "updateInputStatusHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          statusHandles: {
            ...node.data.statusHandles,
            inputs: {
              ...node.data.statusHandles.inputs,
              [payload.target.name]: payload.target.checked,
            },
          },
        },
      };
      break;
    case "updateOutputStatusHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          statusHandles: {
            ...node.data.statusHandles,
            outputs: {
              ...node.data.statusHandles.outputs,
              [payload.target.name]: payload.target.checked,
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
          triggerAttributes: payload.target.value,
        },
      };
      break;
    case "updateHandleCount":
      newNode = {
        ...node,
        data: {
          ...node.data,
          ioEngine: {
            ...node.data.ioEngine,
            [payload.target.name]: Number(payload.target.value),
          },
        },
      };
      break;
    case "freezeHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          frozenHandles: [...node.data.frozenHandles, payload.target.name],
        },
      };
      break;
    case "unFreezeHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          frozenHandles: [
            ...node.data.frozenHandles.filter((handle) => handle !== payload.target.name),
          ],
        },
      };
      break;
    case "addTriggerHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          trigHandles: {
            ...node.data.trigHandles,
            [payload]: false,
          },
        },
      };
      break;
    case "updateTriggerHandles":
      newNode = {
        ...node,
        data: {
          ...node.data,
          trigHandles: {
            ...node.data.trigHandles,
            [payload.target.name]: payload.target.checked,
          },
        },
      };
      break;
    default:
      throw new Error("There are no action in that name");
  }
  return newNode;
}

export default function NodeConfigMenu() {
  const { nodeConfigMenu } = useSelector((state) => state.menus);
  const [node, nodeConfigDispatch] = useReducer(nodeConfigReducer, nodeConfigMenu.element);
  const dispatch = useDispatch();
  const { dynamicInput, dynamicOutput } = node.data.ioEngine;

  useEffect(() => {
    nodeConfigDispatch({ type: "loadNode", payload: nodeConfigMenu.element });
  }, [nodeConfigMenu.element, nodeConfigMenu.state]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setNodeConfigData(node));
    dispatch(setModal(false));
  };

  return (
    <div>
      <Styled.Header>Node Configuration Menu</Styled.Header>
      <div style={{ marginBottom: "30px" }}>{node.id}</div>

      <ConfigParametersForm node={node} dispatcher={nodeConfigDispatch} />

      <StatusHandlesForm node={node} dispatcher={nodeConfigDispatch} />

      <TriggerForm node={node} dispatcher={nodeConfigDispatch} />

      <FrozenHandlesForm node={node} dispatcher={nodeConfigDispatch} />

      {(dynamicInput || dynamicOutput) && (
        <HandleCountForm node={node} dispatcher={nodeConfigDispatch} />
      )}

      <Button onClick={onSubmitHandler}>Save</Button>
    </div>
  );
}
