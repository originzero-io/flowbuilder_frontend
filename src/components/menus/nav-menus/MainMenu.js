import React, { useContext, useState } from "react";
import styled from "styled-components";
import icon from "../../../assets/icons/Set_Variables.png";
import Divider from "../../global/Divider";
import { MenuIndex, MenuItem} from "./style";
import {DropdownWrapper,DropdownList,DropDownItem} from "../../style-components/DropdownComponent"
import { useSelector, useStore, useDispatch } from "react-redux";
import * as themeColor from "../../../config/ThemeReference"

const Menu = styled(MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
`;
const Circle = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.theme === "dark"
      ? "rgba(53, 59, 72,0.5)"
      : "rgba(189, 195, 199,0.5)"};
  border-radius: 50%;
  position: absolute;
  top: -6px;
  left: -45px;
  border: 7px solid
    ${(props) => (props.theme === "dark" ? "#232323" : "#d7d7d7")};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MainMenu() {
  //const dispatch = useDispatch();
  const {theme} = useSelector((state) => state.guiConfigReducer);
  const elements = useSelector((state) => state.elementReducer);

  return (
    <div>
      <Menu theme={theme}>
        <Circle theme={theme}>
          <img
            src={icon}
            alt="noimg"
            width={"30px"}
            height={"30px"}
            draggable={false}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          ></img>
        </Circle>

        <DropdownWrapper>
          <MenuItem theme={theme}>Flow</MenuItem>
          <DropdownList theme={theme}>
            <DropDownItem>Flow 1</DropDownItem>
            <DropDownItem>Flow 2</DropDownItem>
            <DropDownItem>Flow 3</DropDownItem>
          </DropdownList>
        </DropdownWrapper>

        <Divider />
        <MenuItem theme={theme}>Dashboard</MenuItem>
        <Divider />
        <MenuItem theme={theme}>Devices</MenuItem>
        <Divider/>
      </Menu>
    </div>
  );
}
