import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FlowEditor from "../components/FlowEditor/FlowEditor";
import { getGroups } from "../store/reducers/flow/flowGroupsReducer";
import styled from "styled-components";
const FlowWrapper = styled.div`
  height:100%;
  width:100%;
`;
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
FlowPage.propTypes = {
  match: PropTypes.object,
};

export default React.memo(FlowPage);
