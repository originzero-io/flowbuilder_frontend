import React from "react";
import styled from "styled-components";
import { MenuIndex, MenuItem} from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as themeColor from "../../../../config/ThemeReference"
import { Logo } from "../../../global/icons";
import { Link } from "react-router-dom";
import { mergeFlow, setActiveFlow, setCurrentFlowConfig } from "../../../../store/actions/flowActions";
const Menu = styled(MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
  min-width:70px;
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
  const { flowWorkSpaceReducer,flowConfigReducer,nodeGroupsReducer } = useSelector((state) => state.activeFlowReducer);
  const { theme,reactFlowInstance } = flowWorkSpaceReducer;
  const dispatch = useDispatch();
  const homeClickHandle = () => {
    const { position, zoom, elements } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfigReducer,
      workspace: { ...flowWorkSpaceReducer, position, zoom },
      elements: elements,
      groups: nodeGroupsReducer
    };
    dispatch(mergeFlow(flow));
    dispatch(setCurrentFlowConfig({}));
  }
  return (
    <>
      <Menu theme={theme}>
        <Circle theme={theme}>
          <Logo theme={theme}/>
        </Circle>
        <div onClick={homeClickHandle}>
          <Link to="/">
            <MenuItem theme={theme}>Home</MenuItem>
          </Link>
        </div>
        <MenuItem theme={theme}>{flowConfigReducer.name}</MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(MainMenu);