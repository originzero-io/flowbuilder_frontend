import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import { VerticalDivider } from "../../style-components/Divider";
import * as tooltip from "../../../config/TooltipReference";
import { MenuIndex, MenuItem } from "./style";
import { GuideIcon, LockIcon, ProfileIcon, ShareIcon } from "./icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownWrapper,
  DropdownList,
  DropDownItem,
} from "../../style-components/DropdownMenu";
import * as themeColor from "../../../config/ThemeReference";
import {
  importElements,
  setMiniMapDisplay,
} from "../../../REDUX/actions/flowActions";
import { openNotification } from "../../../app-global/dom/notification";
import { loadFunctionsToNode } from "../../../app-global/helpers/loadFunctionsToNode";
import { useStoreActions } from "react-flow-renderer";
import FileInputWrapper from "../../global/FileInputWrapper";
import { FileInput } from "../../style-components/FileInput";
import { Circle } from "../../style-components/Shapes";
import { setTheme } from "../../../REDUX/actions/guiActions";
import Switch from "react-switch";
import SwitchButton from "../../global/buttons/SwitchButton";

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
        openNotification("Import Error", "Bu dosya import edilemez.", "error");
    },
    [reactFlowInstance]
  );
  const [active, setActive] = useState({
    theme: false,
    miniMap: true,
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
        </DropdownList>
      </DropdownWrapper>
    </Menu>
  );
}
