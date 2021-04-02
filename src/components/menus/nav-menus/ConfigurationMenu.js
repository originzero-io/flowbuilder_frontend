import React, { useContext } from "react";
import styled from "styled-components";
import Divider from "../../global/Divider";
import * as tooltip from "../../../config/TooltipReference";
import { MenuIndex, MenuItem } from "./style";
import {
  SettingsIcon,
  GuideIcon,
  ProfileIcon,
} from "../../icon-components/SvgIcons";
import Tooltip from "../../global/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownWrapper,
  DropdownList,
  DropDownItem,
} from "../../style-components/DropdownComponent";
import * as themeColor from "../../../config/ThemeReference"
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
  position: fixed;
  top: 5px;
  right: 0px;
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
  &:focus + ${DropdownList}{
    visibility:visible;
    transform: translateY(0px);
  } 
`;
export default function ConfigurationMenu() {
  const theme = useSelector((state) => state.themeReducer);

  return (
    <Menu theme={theme}>
      <DropdownWrapper>
        <MenuItem data-tip="Settings" data-for={tooltip.SETTINGS}>
          <SettingsIcon
            width={"25px"}
            height={"25px"}
            color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
          ></SettingsIcon>
        </MenuItem>
        <DropdownList theme={theme}>
          <DropDownItem>Settings 1</DropDownItem>
          <DropDownItem>Settings 2</DropDownItem>
          <DropDownItem>Settings 3</DropDownItem>
          <DropDownItem>Settings 4</DropDownItem>
          <DropDownItem>Settings 5</DropDownItem>
        </DropdownList>
      </DropdownWrapper>

      <Divider />
      <MenuItem data-tip="Guides" data-for={tooltip.GUIDES}>
        <GuideIcon
          width={"25px"}
          height={"25px"}
          color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
        ></GuideIcon>
      </MenuItem>

      <DropdownWrapper>
        <Circle theme={theme} data-tip="Profile" data-for={tooltip.PROFILE}>
          <ProfileIcon
            width={"50px"}
            height={"50px"}
            color={theme === "dark" ? themeColor.DARK_ICON : themeColor.LIGHT_ICON}
          ></ProfileIcon>
        </Circle>
        <DropdownList theme={theme} align="right">
          <DropDownItem>Profile</DropDownItem>
          <DropDownItem>Settings</DropDownItem>
          <DropDownItem>User Settings</DropDownItem>
          <DropDownItem>Preferences</DropDownItem>
        </DropdownList>
      </DropdownWrapper>
      
      <Tooltip
        id={tooltip.SETTINGS}
        place="bottom"
        type={theme === "dark" ? "light" : "dark"}
      ></Tooltip>
      <Tooltip
        id={tooltip.GUIDES}
        place="bottom"
        type={theme === "dark" ? "light" : "dark"}
      ></Tooltip>
      <Tooltip
        id={tooltip.PROFILE}
        place="bottom"
        type={theme === "dark" ? "light" : "dark"}
      ></Tooltip>
    </Menu>
  );
}
