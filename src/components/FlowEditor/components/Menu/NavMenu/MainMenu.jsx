import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { Logo } from "components/Shared/icons";
import { useReactFlow } from "reactflow";
import { addSubFlow } from "store/reducers/flow/flowElementsSlice";
import { toPng } from "html-to-image";
import * as Styled from "./NavMenu.style";

const StyledMenu = styled(Styled.MenuIndex)`
  top: 10px;
  left: 50px;
  background: ${(props) => props.theme.menuBackground};
  border-radius: 6px;
  width: 400px;
`;
const StyledCircle = styled.div`
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
    <StyledMenu>
      <StyledCircle>
        <Logo theme={theme} />
      </StyledCircle>
      <div onClick={homeClickHandle}>
        <Link to="/panel/projects">
          <Styled.MenuItem>Home</Styled.MenuItem>
        </Link>
      </div>
      <Styled.MenuItem>{flowConfig.name}</Styled.MenuItem>
      <Styled.MenuItem onClick={() => dispatch(addSubFlow())}>
        Add sub flow
      </Styled.MenuItem>
      <Styled.MenuItem onClick={downloadPageAsImage}>
        Export as Image
      </Styled.MenuItem>
    </StyledMenu>
  );
};

export default React.memo(MainMenu);
