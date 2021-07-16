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
import { useParams } from "react-router-dom";
import FlowTabs from "../components/global/FlowTabs";
const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();
  const flow = useSelector((state) => state.flowReducer).find((flow) => flow.config.id === flowId);
  const loadFlow = () => {
    dispatch(setCurrentFlowConfig(flow.config));
    dispatch(setCurrentFlowWorkspace(flow.workspace));
    dispatch(setElements(flow.elements));
    dispatch(loadGroups(flow.groups));
  }
  useComponentWillMount(() => {
    if (flow) {
      loadFlow();
    }
  }, []);
  const rfWrapper = useRef(null);
  return (
    <ReactFlowProvider>
      {flow !== undefined ? (
        <FlowWrapper ref={rfWrapper}>
          <FlowEditor reactFlowWrapper={rfWrapper} />
          <FlowTabs/>
        </FlowWrapper>
      ) : (
          <Redirect to="/panel"/>
      )}
    </ReactFlowProvider>
  );
}
FlowPage.propTypes = {
  match: PropTypes.object,
};

export default React.memo(FlowPage);