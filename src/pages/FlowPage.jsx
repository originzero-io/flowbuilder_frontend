import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
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

const StyledFlowWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const propTypes = {
  match: PropTypes.object,
};

export let flowExecutorSocket = null;

const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowGui, flowConfig } = useActiveFlow();
  const rfWrapper = useRef(null);

  useEffect(() => {
    flowExecutorSocket = createSocket({
      url: `http://localhost:${flowConfig.port}`,
    });
    // flowExecutorSocket = createSocket({
    //   url: `http://localhost:5003`,
    // });

    flowExecutorEvent.injectSocket(flowExecutorSocket);
    flowExecutorEvent.getNodeList((data) => {
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
  }, []);

  return (
    <ReactFlowProvider>
      <ThemeProvider theme={theme[flowGui.theme]}>
        <StyledFlowWrapper ref={rfWrapper}>
          <FlowEditor reactFlowWrapper={rfWrapper} />
        </StyledFlowWrapper>
      </ThemeProvider>
    </ReactFlowProvider>
  );
};

FlowPage.propTypes = propTypes;

export default React.memo(FlowPage);
