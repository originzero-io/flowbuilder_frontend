import React, { useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { VerticalDivider } from "../../../style-components/Divider";
import * as tooltip from "../../../../config/TooltipReference";
import { MenuIndex, MenuItem } from "./style";
import { GuideIcon, LockIcon, ProfileIcon, ShareIcon } from "./icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownWrapper,
  DropdownList,
  DropDownItem,
} from "../../../style-components/DropdownMenu";
import * as themeColor from "../../../../config/ThemeReference";
import { setEdgeType, setMiniMapDisplay } from "../../../../store/actions/flowActions";
import { changeEdgeType, importElements,setElements } from "../../../../store/actions/elementsActions";
import { openNotification } from "../../../../app-global/dom/notification";
import { loadFunctionsToNode } from "../../../../app-global/helpers/loadFunctionsToNode";
import { isEdge, useStoreActions } from "react-flow-renderer";
import FileInputWrapper from "../../../global/FileInputWrapper";
import { FileInput } from "../../../style-components/FileInput";
import { Circle } from "../../../style-components/Shapes";
import { setTheme } from "../../../../store/actions/guiActions";
import SwitchButton from "../../../global/buttons/SwitchButton";
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
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const elements = useSelector((state) => state.elementReducer).present;
  const { reactFlowInstance, miniMapDisplay } = useSelector(
    (state) => state.flowConfigReducer
  );
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const dispatch = useDispatch();

  const downloadFlowHandle = () => {
    if (confirm("Download?")) {
      if (reactFlowInstance) {
        console.log("reactflefew", reactFlowInstance);
        const flow = reactFlowInstance.toObject();
        console.log("flow:", flow);
        let hiddenElement = document.createElement("a");
        hiddenElement.href =
          "data:application/octet-stream;base64," + btoa(JSON.stringify(flow));
        hiddenElement.target = "_blank";
        hiddenElement.download = "Flow.json";
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
      localStorage.setItem("theme", "light");
    } else {
      dispatch(setTheme("dark"));
      localStorage.setItem("theme", "dark");
    }
    setActive({ ...active, theme: checked });
  };
  const changeMiniMapDisplay = (checked) => {
    if (miniMapDisplay === "visible") {
      dispatch(setMiniMapDisplay("hidden"));
      localStorage.setItem("mini-map", "hidden");
    } else {
      dispatch(setMiniMapDisplay("visible"));
      localStorage.setItem("mini-map", "visible");
    }
    setActive({ ...active, miniMap: checked });
  };
  const edgeTypeHandle = (e) => {
    dispatch(changeEdgeType(e.target.value))
    dispatch(setEdgeType(e.target.value))
  }
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const storedMinimapDisplay = localStorage.getItem("mini-map");
    setActive({
      miniMap: storedMinimapDisplay === "visible" ? true : false,
      theme: storedTheme === "dark" ? true : false,
    });
  }, []);
  return (
    <Menu theme={theme}>
      <DropdownWrapper>
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

      <MenuItem data-tip="Guides" data-for={tooltip.GUIDES}>
        <GuideIcon
          width="25px"
          height="25px"
          color={
            theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
          }
        />
      </MenuItem>
      <DropdownWrapper>
        <Circle theme={theme}>
          <ProfileIcon
            width="50px"
            height="50px"
            color={
              theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
            }
          />
        </Circle>
        <DropdownList theme={theme} align="right">
          <DropDownItem>
            Dark Theme
            <SwitchButton
              checked={active.theme}
              onChange={changeTheme}
              width={30}
              height={15}
            />
          </DropDownItem>
          <DropDownItem>
            Mini-map
            <SwitchButton
              checked={active.miniMap}
              onChange={changeMiniMapDisplay}
              width={30}
              height={15}
            />
          </DropDownItem>
          <DropDownItem>User Settings</DropDownItem>
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
