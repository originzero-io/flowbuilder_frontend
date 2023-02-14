import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FlowEditor from "components/FlowEditor/FlowEditor";
import { getGroups } from "store/reducers/flow/flowGroupsSlice";
import { flowExecutorListener } from "services/configurationService/socketListeners";
import { flowExecutorNamespace } from "SocketConnections";
const FlowWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const propTypes = {
  match: PropTypes.object,
};

const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();

  const rfWrapper = useRef(null);

  useEffect(() => {
    dispatch(getGroups(flowId));
    flowExecutorListener(flowExecutorNamespace);
    flowExecutorNamespace.emit('joinFlowRoom', { flowId });
  }, []);

  return (
    <ReactFlowProvider>
      <FlowWrapper ref={rfWrapper}>
        <FlowEditor reactFlowWrapper={rfWrapper} />
      </FlowWrapper>
    </ReactFlowProvider>
  );
};

FlowPage.propTypes = propTypes;

export default React.memo(FlowPage);
