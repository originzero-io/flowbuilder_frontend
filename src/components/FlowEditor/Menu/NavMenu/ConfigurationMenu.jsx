import React, { useCallback, useEffect, useState } from "react";
import { useStoreActions } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openNotification } from "../../../../app-global/dom/notification";
import { loadFunctionsToNode } from "../../../../app-global/helpers/loadFunctionsToNode";
import * as themeColor from "../../../../config/ThemeReference";
import * as tooltip from "../../../../config/TooltipReference";
import { logOut } from "../../../../store/reducers/authReducer";
import { setModal } from "../../../../store/reducers/componentReducer";
import {
  changeEdgeType,
  importElements,
} from "../../../../store/reducers/flow/flowElementsReducer";
import {
  setMiniMapDisplay,
  setTheme,
  setFlowEdgeType,
} from "../../../../store/reducers/flow/flowGuiReducer";
import { BiBrain } from "react-icons/bi";
import SwitchButton from "../../../global/Button/SwitchButton";
import FileInputWrapper from "../../../global/FileInputWrapper";
import { VerticalDivider } from "../../../style-components/Divider";
import {
  DropDownItem,
  DropdownList,
  DropdownWrapper,
} from "../../../style-components/DropdownMenu";
import { FileInput } from "../../../style-components/FileInput";
import { Circle } from "../../../style-components/Shapes";
import { ProfileIcon, ShareIcon, TuneIcon } from "./Icons";
import { MenuIndex, MenuItem } from "./style";
import useAuth from "../../../../utils/useAuth";
import useActiveFlow from "../../../../utils/useActiveFlow";
import Avatar from "../../../global/Avatar";
const Menu = styled(MenuIndex)`
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
  top: 10px;
  right: 45px;
  width: 160px;
`;

export default function ConfigurationMenu() {
  const { flowGui } = useActiveFlow();
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
        console.log(elements);
        // const flow = {
        //   config: flowConfig,
        //   workspace: flowGui,
        //   elements: elements,
        //   groups: flowGroups
        // }
        // console.log("flow:", flow);
        // let hiddenElement = document.createElement("a");
        // hiddenElement.href =
        //   "data:application/octet-stream;base64," + btoa(JSON.stringify(flow));
        // hiddenElement.target = "_blank";
        // hiddenElement.download = "Flow.json";
        // hiddenElement.click();
        // hiddenElement.remove();
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
        openNotification(
          "Import Error",
          "This file cannot be imported. Please provide JSON file.",
          "error"
        );
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
      <DropdownWrapper tabIndex="1">
        <MenuItem>
          <ShareIcon width="25px" height="25px" theme={theme} />
        </MenuItem>
        <DropdownList theme={theme}>
          <DropDownItem>
            <FileInputWrapper>
              <FileInput type="file" onChange={fileUploadHandle} />
              Import Flow
            </FileInputWrapper>
          </DropDownItem>
          <DropDownItem onClick={downloadFlowHandle}>Export Flow</DropDownItem>
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
        <BiBrain style={{fontSize:'25px',color:theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}}/>
      </MenuItem>
      <DropdownWrapper tabIndex="1">
        <Circle theme={theme}>
          <Avatar avatar={auth.avatar}/>
        </Circle>
        <DropdownList theme={theme} align="right">
          <DropDownItem>
            Dark Theme
            <SwitchButton
              checked={active.theme}
              onChange={changeTheme}
            />
          </DropDownItem>
          <DropDownItem>
            Mini-map
            <SwitchButton
              checked={active.miniMap}
              onChange={changeMiniMapDisplay}
            />
          </DropDownItem>
          <DropDownItem>Account Settings</DropDownItem>
          <DropDownItem onClick={logOutHandle}>Log Out</DropDownItem>
          <DropDownItem>
            <select onChange={edgeTypeHandle} defaultValue="smoothstep">
              <option value="bezier">Bezier</option>
              <option value="step">Step</option>
              <option value="smoothstep">Smooth Step</option>
              <option value="straight">Straight</option>
            </select>
          </DropDownItem>
        </DropdownList>
      </DropdownWrapper>
    </Menu>
  );
}
