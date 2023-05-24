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
import flowExecutorSocket from "services/flowExecutorService/flowExecutor.event";

const StyledFlowWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const propTypes = {
  match: PropTypes.object,
};

const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();
  const { flowGui } = useActiveFlow();
  const rfWrapper = useRef(null);

  useEffect(() => {
    dispatch(getGroups(flowId));
    flowExecutorSocket.joinRoom(flowId);
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
