import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import FlowEditor from "components/FlowEditor/FlowEditor";
import useActiveFlow from "utils/hooks/useActiveFlow";
import theme from "components/Shared/ThemeReference";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import createSocket from "services/createSocket";
import { setActiveFlowConfig } from "store/reducers/flow/flowConfigSlice";
import {
  resetActiveFlowGui,
  setActiveFlowGui,
} from "store/reducers/flow/flowGuiSlice";
import {
  resetActiveFlowElements,
  setActiveFlowElements,
} from "store/reducers/flow/flowElementsSlice";
import { setSystemNodes } from "store/reducers/systemNodeSlice";
import EditorTopLeftMenu from "components/FlowEditor/components/Menu/NavMenu/EditorTopMenu/EditorTopLeftMenu";
import EditorTopRightMenu from "components/FlowEditor/components/Menu/NavMenu/EditorTopMenu/EditorTopRightMenu";
import EditorLeftMenu from "components/FlowEditor/components/Menu/NavMenu/EditorLeftMenu/EditorLeftMenu";
import EditorRightMenu from "components/FlowEditor/components/Menu/NavMenu/EditorLeftMenu/EditorRightMenu";

const StyledFlowWrapper = styled.div`
  height: 95%;
  width: 100%;
  display: flex;
  overflow: hidden;
`;
const FlowTopMenuWrapper = styled.div`
  height: 5%;
  width: 100%;
  background: #2d2d2d;
  color: #43b104;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #262626;
`;
const FlowNameWrapper = styled.div`
  font-size: 2.5vmin;
  margin-left: 120px;
`;

const propTypes = {
  match: PropTypes.object,
};

export let flowExecutorSocket = null;

const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowGui, flowConfig } = useActiveFlow();
  const rfWrapper = useRef(null);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    // flowExecutorSocket = createSocket({
    //   url: `http://localhost:${flowConfig.port}`,
    // });
    flowExecutorSocket = createSocket({
      url: `http://localhost:5003`,
    });

    flowExecutorEvent.injectSocket(flowExecutorSocket);
    flowExecutorEvent.getNodeList((data) => {
      console.log("data:", data);
      dispatch(setSystemNodes(data));
    });

    flowExecutorEvent.getGUISettings((data) => {
      dispatch(setActiveFlowGui(data));
    });
    flowExecutorEvent.getElements((data) => {
      dispatch(setActiveFlowElements(data));
    });
    return () => {
      flowExecutorSocket.disconnect(); // close connection when page changes
      dispatch(setActiveFlowConfig({}));
      dispatch(resetActiveFlowGui());
      dispatch(resetActiveFlowElements());
    };
  }, [dispatch]);

  const showLeftMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <ReactFlowProvider>
      <ThemeProvider theme={theme[flowGui.theme]}>
        <FlowTopMenuWrapper>
          <EditorTopLeftMenu />
          <FlowNameWrapper>{flowConfig.name || "NO - DATA"}</FlowNameWrapper>
          <EditorTopRightMenu />
        </FlowTopMenuWrapper>

        <StyledFlowWrapper ref={rfWrapper}>
          <EditorLeftMenu
            showMenu={showMenu}
            setShowMenu={showLeftMenuHandler}
          />
          <FlowEditor reactFlowWrapper={rfWrapper} />
          <EditorRightMenu />
        </StyledFlowWrapper>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

FlowPage.propTypes = propTypes;

export default React.memo(FlowPage);
