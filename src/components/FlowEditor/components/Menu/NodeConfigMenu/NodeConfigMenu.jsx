import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNodeConfigData } from "store/reducers/flow/flowElementsSlice";
import notificationHelper from "utils/ui/notificationHelper";
import styled from "styled-components";
import ConfigParametersForm from "./ConfigParametersForm";
import StatusHandlesForm from "./StatusHandlesForm";
import TriggerForm from "./TriggerForm";
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
          frozenHandles: [...node.data.frozenHandles, payload],
        },
      };
      break;
    case "unFreezeHandle":
      newNode = {
        ...node,
        data: {
          ...node.data,
          frozenHandles: [...node.data.frozenHandles.filter((handle) => handle !== payload)],
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

const ConfigurationTabWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  margin-bottom: 20px;
`;
const ConfigurationTab = styled.div`
  padding: 0px 30px 0px 30px;
  &:hover {
    border-bottom: 1px solid gray;
  }
  border-bottom: ${({ active }) => active && "1px solid #c1c1c1"};
`;

const SaveButton = styled.div`
  border-radius: 4px;
  // border: 1px solid white;
  background-color: #c1c1c1;
  color: #2d2d2d;
  width: 60px;
  text-align: center;
  font-size: 16px;
  padding: 2px;
  cursor: pointer;
  &:hover {
    background-color: #65cd1a;
  }
`;

export default function NodeConfigMenu() {
  const { nodeConfigMenu } = useSelector((state) => state.menus);
  const [node, nodeConfigDispatch] = useReducer(nodeConfigReducer, nodeConfigMenu.element);
  const dispatch = useDispatch();
  const { dynamicInput, dynamicOutput } = node.data.ioEngine;

  const [configurationTab, setConfigurationTab] = useState("Events");

  useEffect(() => {
    nodeConfigDispatch({ type: "loadNode", payload: nodeConfigMenu.element });
  }, [nodeConfigMenu.element, nodeConfigMenu.state]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setNodeConfigData(node));
    notificationHelper.success("Configurations saved");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton onClick={onSubmitHandler}>Save</SaveButton>
      </div>

      <ConfigurationTabWrapper>
        <ConfigurationTab
          onClick={() => setConfigurationTab("Events")}
          active={configurationTab === "Events"}
        >
          Events
        </ConfigurationTab>
        <ConfigurationTab
          onClick={() => setConfigurationTab("Values")}
          active={configurationTab === "Values"}
        >
          Values
        </ConfigurationTab>
      </ConfigurationTabWrapper>

      {configurationTab === "Events" ? (
        <div>
          <StatusHandlesForm node={node} dispatcher={nodeConfigDispatch} />

          <TriggerForm node={node} dispatcher={nodeConfigDispatch} />

          <FrozenHandlesForm node={node} dispatcher={nodeConfigDispatch} />

          {/* {(dynamicInput || dynamicOutput) && (
            <HandleCountForm node={node} dispatcher={nodeConfigDispatch} />
          )} */}
        </div>
      ) : (
        <ConfigParametersForm node={node} dispatcher={nodeConfigDispatch} />
      )}
      <div style={{ marginBottom: "30px" }}>{node.id}</div>
    </div>
  );
}
