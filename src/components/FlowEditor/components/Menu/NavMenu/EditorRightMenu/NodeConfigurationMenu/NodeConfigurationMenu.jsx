import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deSyncNode, setNodeConfigData } from "store/reducers/flow/flowElementsSlice";
import notificationHelper from "utils/ui/notificationHelper";
import styled from "styled-components";
import { toggleNodeConfigurationMenu } from "store/reducers/menuSlice";
import ConfigParametersForm from "./ConfigParametersForm";
import StatusHandlesForm from "./StatusHandlesForm";
import TriggerForm from "./TriggerForm";
import HandleCountForm from "./HandleCountForm";
import FrozenHandlesForm from "./FrozenHandlesForm";
import IncomersOutgoers from "./IncomersOutgoers";
import { useFlowContext } from "context/FlowDataProvider";

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
            [payload.name]: payload.value,
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
              [payload.name]: payload.value,
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
              [payload.name]: payload.value,
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
          triggerAttributes: payload.value,
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
            [payload.name]: Number(payload.value),
          },
        },
      };
      break;
    case "addInputParameter":
      newNode = {
        ...node,
        data: {
          ...node.data,
          inputParameters: {
            ...node.data.inputParameters,
            ...payload,
          },
        },
      };
      break;
    case "deleteInputParameter":
      newNode = {
        ...node,
        data: {
          ...node.data,
          inputParameters: {
            ...payload,
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
            [payload.name]: payload.value,
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
    color: #c1c1c1;
  }
  border-bottom: ${({ active }) => active && "1px solid #c1c1c1"};
  color: ${({ active }) => !active && "gray"};
`;

const ButtonStyled = styled.div`
  border-radius: 4px;
  background-color: ${({ type }) => (type === "save" ? "rgba(85, 243, 29, 0.2)" : "#393939")};
  color: ${({ type }) => (type === "save" ? "#65cd1a" : "#c1c1c1")};
  width: 60px;
  text-align: center;
  font-size: 14px;
  padding: 2px;
  margin: 2px;
  cursor: pointer;
  &:hover {
    background-color: ${({ type }) => (type === "save" ? "rgba(85, 243, 29, 0.4)" : "#4f4f4f")};
  }
`;
const NodeId = styled.div`
  width: 100%;
  background: #393939;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  padding: 7px;
  color: #a6b3e8;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export default function NodeConfigurationMenu() {
  const { nodeConfigurationMenu } = useSelector((state) => state.menus);
  const [node, nodeConfigDispatch] = useReducer(nodeConfigReducer, nodeConfigurationMenu.element);
  const dispatch = useDispatch();
  const { dynamicInput, dynamicOutput } = node.data.ioEngine;
  const { setSyncedFlow } = useFlowContext();

  const [configurationTab, setConfigurationTab] = useState("Values");

  useEffect(() => {
    nodeConfigDispatch({ type: "loadNode", payload: nodeConfigurationMenu.element });
  }, [nodeConfigurationMenu.element, nodeConfigurationMenu.state]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(setNodeConfigData(node));
    dispatch(deSyncNode({ id: node.id }));
    setSyncedFlow(false);
    notificationHelper.success("Configurations saved");
  };

  const onClosePanelHandler = (event) => {
    event.preventDefault();
    dispatch(toggleNodeConfigurationMenu({ element: nodeConfigurationMenu.element, state: false }));
  };

  return (
    <div>
      <NodeId>{node.id}</NodeId>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "18px" }}>
        <ButtonStyled type="cancel" onClick={onClosePanelHandler}>
          Cancel
        </ButtonStyled>
        <ButtonStyled type="save" onClick={onSubmitHandler}>
          Save
        </ButtonStyled>
      </div>

      <ConfigurationTabWrapper>
        <ConfigurationTab
          onClick={() => setConfigurationTab("Values")}
          active={configurationTab === "Values"}
        >
          Values
        </ConfigurationTab>
        <ConfigurationTab
          onClick={() => setConfigurationTab("Events")}
          active={configurationTab === "Events"}
        >
          Events
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
    </div>
  );
}
