import React, { useState } from "react";
import styled from "styled-components";
import Divider from "../../style-components/Divider";
import * as tooltip from "../../../config/TooltipReference";
import { MenuIndex, MenuItem } from "./style";
import {
  GuideIcon,
  ProfileIcon,
  ShareIcon,
} from "./icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownWrapper,
  DropdownList,
  DropDownItem,
} from "../../style-components/DropdownComponent";
import * as themeColor from "../../../config/ThemeReference";
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
const Circle = styled.button`
  width: 55px;
  height: 55px;
  background: transparent;
  border-radius: 50%;
  position: absolute;
  top: -29px;
  border: 7px solid
    ${(props) => (props.theme === "dark" ? "#232323" : "#d7d7d7")};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.1);
  }
  &:focus + ${DropdownList} {
    visibility: visible;
    transform: translateY(0px);
  }
`;
export default function ConfigurationMenu() {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const { reactFlowInstance } = useSelector((state) => state.flowConfigReducer);
  const [checked, setchecked] = useState(false);
  const onChangeHandle = (checked) => {
    setchecked(checked);
  };
  const downloadFlowHandle = () => {
    if (confirm("Download?")) {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        let hiddenElement = document.createElement('a')
        hiddenElement.href = 'data:application/octet-stream;base64,' + btoa(JSON.stringify(flow.elements))
        hiddenElement.target = '_blank'
        hiddenElement.download = 'Flow.json'
        hiddenElement.click()
        hiddenElement.remove()
      }
    }
  }
  return (
    <Menu theme={theme}>
      <DropdownWrapper>
        <MenuItem data-tip="Share" data-for={tooltip.SHARE}>
          <ShareIcon
            width="25px"
            height="25px"
            theme={theme}
            onClick={downloadFlowHandle}
          />
        </MenuItem>
        <DropdownList theme={theme}>
          <DropDownItem>Import Flow</DropDownItem>
          <DropDownItem>Export Flow</DropDownItem>
        </DropdownList>
      </DropdownWrapper>
      <Divider />
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
        <Circle theme={theme} data-tip="Profile" data-for={tooltip.PROFILE}>
          <ProfileIcon
            width="50px"
            height="50px"
            color={
              theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON
            }
          />
        </Circle>
        <DropdownList theme={theme} align="right">
          <DropDownItem>Profile</DropDownItem>
          <DropDownItem>Settings</DropDownItem>
          <DropDownItem>User Settings</DropDownItem>
          <DropDownItem>Preferences</DropDownItem>
        </DropdownList>
      </DropdownWrapper>
    </Menu>
  );
}
