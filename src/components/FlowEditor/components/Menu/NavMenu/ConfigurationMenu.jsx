import React, { useCallback, useState } from "react";
import {
  getIncomers,
  useReactFlow,
  useStore,
  useStoreActions,
} from "reactflow";
import { BiBrain } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import themeColor from "components/Shared/ThemeReference";
import { logOut } from "store/reducers/authSlice";
import {
  changeEdgeType,
  importFlow,
} from "store/reducers/flow/flowElementsSlice";
import {
  setFlowEdgeType,
  setMiniMapDisplay,
  setTheme,
} from "store/reducers/flow/flowGuiSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import useAuth from "utils/hooks/useAuth";
import Avatar from "components/Shared/Avatar/Avatar";
import { FileInput } from "components/Shared/FileInput/FileInput";
import { GoDeviceDesktop } from "react-icons/go";
import { VscRunAll } from "react-icons/vsc";
import notification from "utils/ui/notificationHelper";
import { backendFlowDataBuilder } from "components/FlowEditor/helpers/flowHelper";
import { useParams } from "react-router-dom";
import Tooltip from "components/Shared/Tooltip/Tooltip";
import * as StyledDropdown from "components/StyledComponents/DropdownMenu";
import * as StyledShapes from "components/StyledComponents/Shapes";
import * as StyledDivider from "components/StyledComponents/Divider";
import flowExecutorSocket from "services/flowExecutorService/flowExecutor.event";
import {
  checkIfTriggerNode,
  checkUnconnectedNodes,
  getFunctionalNodes,
  valueEdgesConnectedToMe,
} from "components/FlowEditor/helpers/debugHelpers";
import * as Styled from "./NavMenu.style";
import { ShareIcon, TuneIcon } from "./Icons";
import SwitchButton from "../../../nodes/shared/SwitchButton";

const dummyDevices = [
  {
    id: "1",
    name: "Akin-PC",
    ip: "192.168.1.101",
  },
  {
    id: "2",
    name: "Anil-PC",
    ip: "192.168.1.102",
  },
];

export default function ConfigurationMenu() {
  const { flowGui, flowConfig } = useActiveFlow();
  const { flowId } = useParams();
  const auth = useAuth();
  const { miniMapDisplay, theme } = flowGui;
  const reactFlowInstance = useReactFlow();
  const dispatch = useDispatch();

  const downloadFlowHandle = () => {
    if (confirm("Download?")) {
      if (reactFlowInstance) {
        const elements = reactFlowInstance.toObject();
        console.log("elements: ", reactFlowInstance.toObject());
        const hiddenElement = document.createElement("a");
        hiddenElement.href = `data:application/octet-stream;base64,${window.btoa(
          JSON.stringify(elements),
        )}`;
        hiddenElement.target = "_blank";
        hiddenElement.download = `${flowConfig.name}.json`;
        hiddenElement.click();
        hiddenElement.remove();
      }
    }
  };
  const fileUploadHandle = useCallback(
    (e) => {
      const fileReader = new FileReader();
      const fileType = e.target.files[0]?.type;
      if (fileType === "application/json") {
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (event) => {
          const flow = JSON.parse(event.target.result);
          dispatch(importFlow(flow));
        };
      } else
        notification.error(
          "This file cannot be imported. Please provide JSON file",
        );
    },
    [reactFlowInstance],
  );
  const [active, setActive] = useState({
    theme: false,
    miniMap: false,
  });
  const changeTheme = (checked) => {
    if (theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
    setActive({ ...active, theme: checked });
  };
  const changeMiniMapDisplay = (checked) => {
    if (miniMapDisplay === "visible") {
      dispatch(setMiniMapDisplay("hidden"));
    } else {
      dispatch(setMiniMapDisplay("visible"));
    }
    setActive({ ...active, miniMap: checked });
  };
  const edgeTypeHandle = (e) => {
    dispatch(setFlowEdgeType(e.target.value));
    dispatch(changeEdgeType(e.target.value));
  };
  const logOutHandle = () => {
    if (confirm("Are you sure?")) {
      dispatch(logOut());
    }
  };
  const debugFlow = () => {
    const { nodes, edges } = reactFlowInstance.toObject();
    const functionalNodes = getFunctionalNodes(nodes);

    const unconnectedNodes = checkUnconnectedNodes(functionalNodes, edges);

    if (!checkIfTriggerNode(nodes)) {
      notification.error("Flow does not contain any trigger node.");
    }
    // else if (unconnectedNodes.exist) {
    //   notification.error(
    //     `This flow contains unconnected nodes. Please make sure to connect all nodes. Unconnected nodes:
    //     ${unconnectedNodes.nodes.map((node) => {
    //       return `\n - ${node.type}`;
    //     })}`,
    //   );
    // }
    else {
      flowExecutorSocket.debugFlow(
        backendFlowDataBuilder(flowId, { nodes, edges }),
        (response) => {
          notification.warn(response);
        },
      );
    }
  };

  return (
    <Styled.Menu>
      <StyledDropdown.DropdownWrapper tabIndex="1">
        <Styled.MenuItem>
          <Button
            style={{
              width: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px",
            }}
            color="success"
          >
            <VscRunAll />
            <div>Debug</div>
          </Button>
        </Styled.MenuItem>
        <StyledDropdown.DropdownList>
          <StyledDropdown.DropdownItem>
            <div onClick={debugFlow}>This PC</div>
          </StyledDropdown.DropdownItem>
          {dummyDevices.map((device) => (
            <StyledDropdown.DropdownItem
              style={{ fontSize: "1.5vmin" }}
              key={device.id}
            >
              <GoDeviceDesktop
                style={{ fontSize: "36px", marginRight: "5px" }}
              />
              <div>
                {device.name}{" "}
                <span style={{ color: "gray", fontSize: "1.2vmin" }}>
                  {device.ip}
                </span>
              </div>
            </StyledDropdown.DropdownItem>
          ))}
        </StyledDropdown.DropdownList>
      </StyledDropdown.DropdownWrapper>

      <StyledDropdown.DropdownWrapper tabIndex="1">
        <Styled.MenuItem data-tip="Share" data-for="share">
          <ShareIcon width="25px" height="25px" theme={theme} />
        </Styled.MenuItem>
        <Tooltip id="share" place="bottom" />

        <StyledDropdown.DropdownList>
          <StyledDropdown.DropdownItem>
            <FileInput onChange={fileUploadHandle} label="Import Flow" />
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem onClick={downloadFlowHandle}>
            Export Flow
          </StyledDropdown.DropdownItem>
        </StyledDropdown.DropdownList>
      </StyledDropdown.DropdownWrapper>
      <StyledDivider.VerticalDivider />

      <Styled.MenuItem data-tip="Settings" data-for="settings">
        <TuneIcon color={themeColor[theme].iconColor} />
      </Styled.MenuItem>
      <Tooltip id="settings" place="bottom" />

      <StyledDivider.VerticalDivider />

      <Styled.MenuItem data-tip="Learn" data-for="learn">
        <BiBrain
          style={{
            fontSize: "25px",
            color: themeColor[theme].iconColor,
          }}
        />
      </Styled.MenuItem>
      <Tooltip id="learn" place="bottom" />

      <StyledDropdown.DropdownWrapper tabIndex="1">
        <StyledShapes.Circle>
          <Avatar avatar={auth.avatar} />
        </StyledShapes.Circle>
        <StyledDropdown.DropdownList align="right">
          <StyledDropdown.DropdownItem>
            Dark Theme
            <SwitchButton checked={active.theme} onChange={changeTheme} />
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem>
            Mini-map
            <SwitchButton
              checked={active.miniMap}
              onChange={changeMiniMapDisplay}
            />
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem>
            Account Settings
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem onClick={logOutHandle}>
            Log Out
          </StyledDropdown.DropdownItem>
          <StyledDropdown.DropdownItem>
            <select onChange={edgeTypeHandle} defaultValue="smoothstep">
              <option value="bezier">Bezier</option>
              <option value="step">Step</option>
              <option value="smoothstep">Smooth Step</option>
              <option value="straight">Straight</option>
            </select>
          </StyledDropdown.DropdownItem>
        </StyledDropdown.DropdownList>
      </StyledDropdown.DropdownWrapper>
    </Styled.Menu>
  );
}
