import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { elementNamespace } from "SocketConnections";
import useActiveFlow from "hooks/useActiveFlow";
import { Logo } from "components/Shared/icons";
import { useReactFlow } from "reactflow";
import { addSubFlow } from "store/reducers/flow/flowElementsSlice";
import { toPng } from "html-to-image";
import { MenuIndex, MenuItem } from "./NavMenu.style";

const Menu = styled(MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) => props.theme.menuBackground};
  border-radius: 6px;
  width: 400px;
`;
const Circle = styled.div`
  width: 55px;
  height: 55px;
  background: ${(props) => props.theme.menuBackground};
  border-radius: 50%;
  position: absolute;
  top: -8px;
  left: -45px;
  border: 7px solid ${(props) => props.theme.paneBackground};
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
  const { theme } = flowGui;
  const dispatch = useDispatch();
  const reactFlowInstance = useReactFlow();
  const homeClickHandle = async () => {
    // const { nodes, edges, viewport } = reactFlowInstance.toObject();
    // const flow = {
    //   config: flowConfig,
    //   gui: {
    //     ...flowGui,
    //     viewport
    //   }
    // }
    // await FlowService.saveFlowGui(flowId, flow);
    // elementNamespace.emit("elements:save", { flowId: flowId, elements: { nodes, edges } });
  };

  const nameClick = () => {
    elementNamespace.emit("elements:messageFromClient", {
      message: "Naber elements?",
    });
  };
  function downloadImage(dataUrl) {
    const a = document.createElement("a");

    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
  }
  const downloadPageAsImage = () => {
    toPng(document.querySelector(".react-flow"), {
      filter: (node) => {
        // we don't want to add the minimap and the controls to the image
        if (
          node?.classList?.contains("react-flow__minimap") ||
          node?.classList?.contains("react-flow__controls")
        ) {
          return false;
        }

        return true;
      },
    }).then(downloadImage);
  };
  return (
    <Menu>
      <Circle>
        <Logo theme={theme} />
      </Circle>
      <div onClick={homeClickHandle}>
        <Link to="/panel/projects">
          <MenuItem>Home</MenuItem>
        </Link>
      </div>
      <MenuItem onClick={nameClick}>{flowConfig.name}</MenuItem>
      <MenuItem onClick={() => dispatch(addSubFlow())}>Add sub flow</MenuItem>
      <MenuItem onClick={downloadPageAsImage}>Export as Image</MenuItem>
    </Menu>
  );
};

export default React.memo(MainMenu);
