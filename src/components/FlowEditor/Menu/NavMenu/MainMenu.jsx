import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {  mainNamespace,elementNamespace } from "../../../../App";
import * as themeColor from "../../../../config/ThemeReference";
import { saveFlowService } from "../../../../services/flowService";
import { saveElements, setElements } from "../../../../store/reducers/flow/flowElementsReducer";
import { getFlowsByWorkspace } from "../../../../store/reducers/flow/flowReducer";
import { Logo } from "../../../global/icons";
import { MenuIndex, MenuItem } from "./style";
const Menu = styled(MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
  min-width: 70px;
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
  &:hover {
    transform: scale(1.1);
  }
`;
const MainMenu = () => {
  const { flowGui, flowConfig } = useSelector((state) => state.activeFlow);
  const { activeWorkspace } = useSelector((state) => state.workspaces);
  const { theme, reactFlowInstance } = flowGui;
  const { flowId } = useParams();
  const dispatch = useDispatch();
  const homeClickHandle = async () => {
    const { position, zoom, elements } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfig,
      gui: { ...flowGui, position, zoom },
    };
    await saveFlowService(flowId, flow);
    //await saveElementsService(flowId, elements);

    elementNamespace.emit("elements:save", { flow_id: flowId, elements });
    dispatch(setElements([]));
    dispatch(getFlowsByWorkspace(activeWorkspace));
  };
  const nameClick = () => {
    console.log("tıkladım");
    console.log("Main:", mainNamespace);
    console.log("eLEMENT:", elementNamespace);
    mainNamespace.emit("main:messageFromClient", { message: 'Naber main?' });
    elementNamespace.emit("elements:messageFromClient", { message: 'Naber elements?' });
  }
  return (
    <>
      <Menu theme={theme}>
        <Circle theme={theme}>
          <Logo theme={theme} />
        </Circle>
        <div onClick={homeClickHandle}>
          <Link to="/panel/all">
            <MenuItem theme={theme}>Home</MenuItem>
          </Link>
        </div>
        <MenuItem theme={theme} onClick={nameClick}>{flowConfig.name}</MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(MainMenu);
