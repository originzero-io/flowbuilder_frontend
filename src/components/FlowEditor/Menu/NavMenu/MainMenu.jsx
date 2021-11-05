import React from "react";
import styled from "styled-components";
import { MenuIndex, MenuItem} from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as themeColor from "../../../../config/ThemeReference"
import { Logo } from "../../../Global/icons";
import { Link,useParams } from "react-router-dom";
import { mergeFlow, setActiveFlow, setCurrentFlowConfig } from "../../../../store/actions/flowActions";
import { saveFlowService } from "../../../../services/flowService";
import { saveElementsService } from "../../../../services/elementService";
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
  const { flowWorkspace,flowConfig,flowGroups } = useSelector((state) => state.activeFlow);
  const { theme, reactFlowInstance } = flowWorkspace;
  const { flowId } = useParams();
  const dispatch = useDispatch();
  const homeClickHandle = async () => {
    const { position, zoom, elements } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfig,
      workspace: { ...flowWorkspace, position, zoom },
    };
    console.log("elements:", elements);
    await saveFlowService(flowId, flow);

    const data = await saveElementsService(flowId, elements);
    console.log("SAVE DATA:", data);
    // dispatch(mergeFlow(flow));
    // dispatch(setCurrentFlowConfig({}));
  }
  return (
    <>
      <Menu theme={theme}>
        <Circle theme={theme}>
          <Logo theme={theme}/>
        </Circle>
        <div onClick={homeClickHandle}>
          <Link to="/panel/all">
            <MenuItem theme={theme}>Home</MenuItem>
          </Link>
        </div>
        <MenuItem theme={theme}>{flowConfig.name}</MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(MainMenu);