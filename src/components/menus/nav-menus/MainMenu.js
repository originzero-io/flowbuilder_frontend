import React, { useContext, useState } from "react";
import styled from "styled-components";
import Divider from "../../style-components/Divider";
import { MenuIndex, MenuItem} from "./style";
import { useSelector, useDispatch } from "react-redux";
import * as themeColor from "../../../config/ThemeReference"
import { Logo } from "../../global/icons";
const Menu = styled(MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
  width:70px;
`;
const Circle = styled.div`
  width: 55px;
  height: 55px;
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

const MainMenu = () => {
  const {theme} = useSelector((state) => state.guiConfigReducer);
  return (
    <div>
      <Menu theme={theme}>
        <Circle theme={theme}>
          <Logo theme={theme}/>
        </Circle>
        <MenuItem theme={theme}>Home</MenuItem>
      </Menu>
    </div>
  );
}

export default React.memo(MainMenu);