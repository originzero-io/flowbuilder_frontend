import PropTypes from "prop-types";
import React, { useRef } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FlowEditor from "components/FlowEditor/FlowEditor";
const FlowWrapper = styled.div`
  height:100%;
  width:100%;
`;

const propTypes = {
  match: PropTypes.object,
};

const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();

  const rfWrapper = useRef(null);
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
