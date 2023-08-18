import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import FlowEditor from "components/FlowEditor/FlowEditor";
import { getGroups } from "store/reducers/flow/flowGroupsSlice";
import useActiveFlow from "utils/hooks/useActiveFlow";
import theme from "components/Shared/ThemeReference";
import flowExecutorEvent from "services/flowExecutorService/flowExecutor.event";
import createSocket from "services/createSocket";

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
  const { flowId, port } = useParams();
  const { flowGui } = useActiveFlow();
  const rfWrapper = useRef(null);

  useEffect(() => {
    dispatch(getGroups(flowId));

    flowExecutorSocket = createSocket({
      url: `http://localhost:${port}`,
    });
    flowExecutorEvent.injectSocket(flowExecutorSocket);
    flowExecutorEvent.getNodeList();
    return () => {
      flowExecutorSocket.disconnect(); // Sayfa değiştiğinde bağlantıyı kapat
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
