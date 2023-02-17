import React, { useCallback, useState } from "react";
import { useReactFlow, useStore, useStoreActions } from "reactflow";
import { BiBrain } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import themeColor from "constants/ThemeReference";
import * as tooltip from "constants/TooltipReference";
import { logOut } from "store/reducers/authSlice";
import { changeEdgeType } from "store/reducers/flow/flowElementsSlice";
import {
  setFlowEdgeType,
  setMiniMapDisplay,
  setTheme,
} from "store/reducers/flow/flowGuiSlice";
import useActiveFlow from "hooks/useActiveFlow";
import useAuth from "hooks/useAuth";
import Avatar from "components/Shared/Avatar";
import { FileInput } from "components/Shared/FileInput/FileInput";
import { GoDeviceDesktop } from "react-icons/go";
import { VscRunAll } from "react-icons/vsc";
import notification from "utils/notificationHelper";
import { flowExecutorNamespace } from "SocketConnections";
import { backendFlowDataBuilder } from "components/FlowEditor/helpers/flowHelper";
import { useParams } from "react-router-dom";
import { Menu, MenuItem } from "./NavMenu.style";
import { ShareIcon, TuneIcon } from "./Icons";
import { Circle } from "../../../../StyledComponents/Shapes";
import {
  DropdownItem,
  DropdownList,
  DropdownWrapper,
} from "../../../../StyledComponents/DropdownMenu";
import { VerticalDivider } from "../../../../StyledComponents/Divider";
import SwitchButton from "../../../Nodes/shared/SwitchButton";

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
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const setSelectedElements = useStore(
    (actions) => actions.setSelectedElements,
  );
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
    // (e) => {
    //   const fileReader = new FileReader();
    //   const fileType = e.target.files[0]?.type;
    //   if (fileType === "application/json") {
    //     fileReader.readAsText(e.target.files[0], "UTF-8");
    //     fileReader.onload = (e) => {
    //       const flow = JSON.parse(e.target.result);
    //       const newArray = flow.elements.map((els) => {
    //         return {
    //           ...els,
    //           data: {
    //             ...els.data,
    //             onChange: loadFunctionsToNode(els.type, nodeClass),
    //           },
    //         };
    //       });
    //       dispatch(setElements(newArray));
    //       setSelectedElements(newArray);
    //     };
    //   } else

    //   notification.error("This file cannot be imported. Please provide JSON file");
    // },
    (e) => {
      console.log(e);
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
    const elements = reactFlowInstance.toObject();
    const triggerNodes = elements.nodes.filter(
      (node) => node.type === "TRIGGER",
    );
    if (triggerNodes.length > 0) {
      flowExecutorNamespace.emit(
        "debugFlow",
        backendFlowDataBuilder(flowId, elements),
      );
    } else {
      notification.error("Flow does not contain any trigger node.");
    }
  };

  return (
    <Menu>
      <DropdownWrapper tabIndex="1">
        <MenuItem>
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
            <div onClick={debugFlow}>Debug</div>
          </Button>
        </MenuItem>
        <DropdownList>
          <DropdownItem>
            <div>This PC</div>
          </DropdownItem>
          {dummyDevices.map((device) => (
            <DropdownItem style={{ fontSize: "1.5vmin" }} key={device.id}>
              <GoDeviceDesktop
                style={{ fontSize: "36px", marginRight: "5px" }}
              />
              <div>
                {device.name}{" "}
                <span style={{ color: "gray", fontSize: "1.2vmin" }}>
                  {device.ip}
                </span>
              </div>
            </DropdownItem>
          ))}
        </DropdownList>
      </DropdownWrapper>

      <DropdownWrapper tabIndex="1">
        <MenuItem>
          <ShareIcon width="25px" height="25px" theme={theme} />
        </MenuItem>
        <DropdownList>
          <DropdownItem>
            <FileInput onChange={fileUploadHandle} label="Import Flow" />
          </DropdownItem>
          <DropdownItem onClick={downloadFlowHandle}>Export Flow</DropdownItem>
        </DropdownList>
      </DropdownWrapper>
      <VerticalDivider />

      <MenuItem data-tip="Settings" data-for={tooltip.SETTINGS}>
        <TuneIcon color={themeColor[theme].iconColor} />
      </MenuItem>
      <VerticalDivider />

      <MenuItem data-tip="Learn" data-for={tooltip.LEARN}>
        <BiBrain
          style={{
            fontSize: "25px",
            color: themeColor[theme].iconColor,
          }}
        />
      </MenuItem>
      <DropdownWrapper tabIndex="1">
        <Circle>
          <Avatar avatar={auth.avatar} />
        </Circle>
        <DropdownList align="right">
          <DropdownItem>
            Dark Theme
            <SwitchButton checked={active.theme} onChange={changeTheme} />
          </DropdownItem>
          <DropdownItem>
            Mini-map
            <SwitchButton
              checked={active.miniMap}
              onChange={changeMiniMapDisplay}
            />
          </DropdownItem>
          <DropdownItem>Account Settings</DropdownItem>
          <DropdownItem onClick={logOutHandle}>Log Out</DropdownItem>
          <DropdownItem>
            <select onChange={edgeTypeHandle} defaultValue="smoothstep">
              <option value="bezier">Bezier</option>
              <option value="step">Step</option>
              <option value="smoothstep">Smooth Step</option>
              <option value="straight">Straight</option>
            </select>
          </DropdownItem>
        </DropdownList>
      </DropdownWrapper>
    </Menu>
  );
}
