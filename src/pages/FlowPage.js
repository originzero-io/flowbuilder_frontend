import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowEditor from "../components/FlowEditor";
import { FlowWrapper } from "../components/style-components/AppWrapper";
import PropTypes from "prop-types";
import {
  setCurrentFlowConfig,
  setCurrentFlowWorkspace,
} from "../store/actions/flowActions";
import useComponentWillMount from "../hooks/useComponentWillMount";
import { setElements } from "../store/actions/elementsActions";
import { loadGroups } from "../store/actions/nodeGroupsActions";
import { Redirect } from "react-router";
export default function FlowPage({ match }) {
  const dispatch = useDispatch();
  const flowId = match.params.flowId;
  const flow = useSelector((state) => state.flowReducer).find((flow) => flow.config.id === flowId);
  useComponentWillMount(() => {
    if (flow) {
      dispatch(setCurrentFlowConfig(flow.config));
      dispatch(setCurrentFlowWorkspace(flow.workspace));
      dispatch(setElements(flow.elements));
      dispatch(loadGroups(flow.groups));
    }
  }, []);
  const rfWrapper = useRef(null);
  return (
    <ReactFlowProvider>
      {flow !== undefined ? (
        <FlowWrapper ref={rfWrapper}>
          <FlowEditor reactFlowWrapper={rfWrapper} />
        </FlowWrapper>
      ) : (
          <Redirect to="/"/>
      )}
    </ReactFlowProvider>
  );
}
FlowPage.propTypes = {
  match: PropTypes.object,
};
