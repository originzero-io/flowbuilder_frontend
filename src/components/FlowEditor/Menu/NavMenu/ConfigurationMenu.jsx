import React, { useCallback, useState } from "react";
import { useStoreActions } from "react-flow-renderer";
import { BiBrain } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import styled from "styled-components";
import { loadFunctionsToNode } from "../../../../app-global/helpers/loadFunctionsToNode";
import * as themeColor from "../../../../config/ThemeReference";
import * as tooltip from "../../../../config/TooltipReference";
import { logOut } from "../../../../store/reducers/authReducer";
import {
  changeEdgeType,
  importElements,
} from "../../../../store/reducers/flow/flowElementsReducer";
import {
  setFlowEdgeType,
  setMiniMapDisplay,
  setTheme,
} from "../../../../store/reducers/flow/flowGuiReducer";
import useActiveFlow from "../../../../utils/useActiveFlow";
import useAuth from "../../../../utils/useAuth";
import Avatar from "../../../global/Avatar";
import SwitchButton from "../../../global/Button/SwitchButton";
import { FileInput } from "../../../global/FileInput/FileInput";
import { VerticalDivider } from "../../../style-components/Divider";
import {
  DropdownItem,
  DropdownList,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import { Circle } from "../../../style-components/Shapes";
import { ShareIcon, TuneIcon } from "./Icons";
import { Menu, MenuItem } from "./style";
import { GoDeviceDesktop } from "react-icons/go";
import { VscRunAll } from "react-icons/vsc";
import toast from "react-hot-toast"

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
  const auth = useAuth();
  const { reactFlowInstance, miniMapDisplay, theme } = flowGui;
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const dispatch = useDispatch();

  const downloadFlowHandle = () => {
    if (confirm("Download?")) {
      if (reactFlowInstance) {
        const { elements } = reactFlowInstance.toObject();
        let hiddenElement = document.createElement("a");
        hiddenElement.href =
          "data:application/octet-stream;base64," +
          window.btoa(JSON.stringify(elements));
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
        fileReader.onload = (e) => {
          const flow = JSON.parse(e.target.result);
          const newArray = flow.elements.map((els) => {
            return {
              ...els,
              data: {
                ...els.data,
                onChange: loadFunctionsToNode(els.type, nodeClass),
              },
            };
          });
          dispatch(importElements(newArray));
          setSelectedElements(newArray);
        };
      } else
        
      toast.error("This file cannot be imported. Please provide JSON file");
    },
    [reactFlowInstance]
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

  return (
    <Menu theme={theme}>
      {/* <MenuItem>
        <Button color="success">Execute</Button>
      </MenuItem> */}

      <DropdownWrapper tabIndex="1">
        <MenuItem>
          <Button style={{width:'100px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'5px'}} color="success"><VscRunAll></VscRunAll><div>Execute</div></Button>
        </MenuItem>
        <DropdownList theme={theme}>
          <DropdownItem>
            <div>This PC</div>
          </DropdownItem>
          {dummyDevices.map((device) => {
            return (
              <DropdownItem style={{ fontSize: "1.5vmin" }} key={device.id}>
                <GoDeviceDesktop style={{fontSize:'36px',marginRight:'5px'}}/>
                <div>{device.name} <span style={{color:'gray',fontSize:'1.2vmin'}}>{device.ip}</span></div>
              </DropdownItem>
            );
          })}
        </DropdownList>
      </DropdownWrapper>

      <DropdownWrapper tabIndex="1">
        <MenuItem>
          <ShareIcon width="25px" height="25px" theme={theme} />
        </MenuItem>
        <DropdownList theme={theme}>
          <DropdownItem>
            <FileInput onChange={fileUploadHandle} label="Import Flow" />
          </DropdownItem>
          <DropdownItem onClick={downloadFlowHandle}>Export Flow</DropdownItem>
        </DropdownList>
      </DropdownWrapper>
      <VerticalDivider theme={theme} />

      <MenuItem data-tip="Settings" data-for={tooltip.SETTINGS}>
        <TuneIcon
          color={
            theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          }
        />
      </MenuItem>
      <VerticalDivider theme={theme} />

      <MenuItem data-tip="Learn" data-for={tooltip.LEARN}>
        <BiBrain
          style={{
            fontSize: "25px",
            color:
              theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON,
          }}
        />
      </MenuItem>
      <DropdownWrapper tabIndex="1">
        <Circle theme={theme}>
          <Avatar avatar={auth.avatar} />
        </Circle>
        <DropdownList theme={theme} align="right">
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
