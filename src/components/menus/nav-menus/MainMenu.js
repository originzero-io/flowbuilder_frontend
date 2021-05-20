import React, { useContext, useState } from "react";
import styled from "styled-components";
import Divider from "../../style-components/Divider";
import { MenuIndex, MenuItem} from "./style";
import { useSelector, useDispatch } from "react-redux";
import * as themeColor from "../../../config/ThemeReference"
import { Logo } from "../../global/icons";
import { getNodesAndEdges } from "../../../app-global/helpers/elementController";
import { getConnectedEdges } from "react-flow-renderer";
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
  top: -8px;
  left: -45px;
  border: 7px solid
    ${(props) => (props.theme === "dark" ? "#232323" : "#d7d7d7")};
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    transform:scale(1.1);
  }
`;

const MainMenu = () => {
  const { theme } = useSelector((state) => state.guiConfigReducer);
  const elements = useSelector((state) => state.elementReducer).present;
  
  const connectedEdgeHandle = () => {
    const { nodes, edges } = getNodesAndEdges(elements);
    const connectedEdges = getConnectedEdges(nodes, edges);
    console.log("connected-edges:", connectedEdges);
  }
  return (
    <div>
      <Menu theme={theme}>
        <Circle theme={theme}>
          <Logo theme={theme}/>
        </Circle>
        <MenuItem theme={theme} onClick={connectedEdgeHandle}>Home</MenuItem>
      </Menu>
    </div>
  );
}

export default React.memo(MainMenu);