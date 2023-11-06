import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import useActiveFlow from "utils/hooks/useActiveFlow";
import { Logo } from "components/Shared/icons";
import { useReactFlow } from "reactflow";
import { addSubFlow } from "store/reducers/flow/flowElementsSlice";
import { toPng } from "html-to-image";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiScreenshot2Line } from "react-icons/ri";
import * as Styled from "../NavMenu.style";
import CompanyLogo from "components/Shared/CompanyLogo";

const StyledMenu = styled.div`
  // background: ${(props) => props.theme.menuBackground};
  background: transparent;
  display: flex;
  flex-direction: row;
  // justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const EditorTopLeftMenu = () => {
  const { flowGui, flowConfig } = useActiveFlow();
  const { theme } = flowGui;
  const dispatch = useDispatch();

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
      {/* <Logo theme={theme} /> */}
      <CompanyLogo size={50} />
      <div>
        <Link to="/panel/projects">
          <Styled.MenuItem>
            <BiHomeAlt2 style={{ color: "#43b104", fontSize: "2.5vmin" }} />
          </Styled.MenuItem>
        </Link>
      </div>

      <Styled.MenuItem onClick={() => dispatch(addSubFlow())}>
        <VscTypeHierarchySub fontSize={"2.5vmin"} />
      </Styled.MenuItem>
      <Styled.MenuItem onClick={downloadPageAsImage}>
        <RiScreenshot2Line fontSize={"2.5vmin"} />
      </Styled.MenuItem>
    </StyledMenu>
  );
};

export default React.memo(EditorTopLeftMenu);
