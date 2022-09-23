import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { elementNamespace } from "SocketConnections";
import * as themeColor from "constants/ThemeReference";
import FlowService from "services/configurationService/flowService";
import { getFlowsByWorkspace } from "store/reducers/flow/flowSlice";
import useWorkspace from "hooks/useWorkspace";
import useActiveFlow from "hooks/useActiveFlow";
import { Logo } from "components/Shared/icons";
import { MenuIndex, MenuItem } from "./NavMenu.style";
import { useReactFlow } from "react-flow-renderer";
import { addSubFlow } from "store/reducers/flow/flowElementsSlice";
import { toPng } from 'html-to-image';

const Menu = styled(MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) =>
    props.theme === "dark"
      ? themeColor.DARK_MENU_BACKGROUND
      : themeColor.LIGHT_MENU_BACKGROUND};
  border-radius: 6px;
  width:400px;
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
  const { flowGui, flowConfig } = useActiveFlow();
  const { activeWorkspace } = useWorkspace();
  const { theme } = flowGui;
  const { flowId } = useParams();
  const dispatch = useDispatch();
  const reactFlowInstance = useReactFlow();
  const homeClickHandle = async () => {
    const { nodes, edges, viewport } = reactFlowInstance.toObject();
    const flow = {
      config: flowConfig,
      gui: {
        ...flowGui,
        viewport
      }
    }
    await FlowService.saveFlowGui(flowId, flow);
    elementNamespace.emit("elements:save", { flowId: flowId, elements: { nodes, edges } });
    dispatch(getFlowsByWorkspace(activeWorkspace));
  };

  const nameClick = () => {
    elementNamespace.emit("elements:messageFromClient", { message: 'Naber elements?' });
  }
  function downloadImage(dataUrl) {
    const a = document.createElement('a');
  
    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }
  const downloadPageAsImage = () => {
    toPng(document.querySelector('.react-flow'), {
      filter: (node) => {
        // we don't want to add the minimap and the controls to the image
        if (
          node?.classList?.contains('react-flow__minimap') ||
          node?.classList?.contains('react-flow__controls')
        ) {
          return false;
        }

        return true;
      },
    }).then(downloadImage);
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
        <MenuItem theme={theme} onClick={()=>dispatch(addSubFlow())}>Add sub flow</MenuItem>
        <MenuItem theme={theme} onClick={downloadPageAsImage}>Export as Image</MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(MainMenu);
