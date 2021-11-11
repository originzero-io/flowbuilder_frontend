import React, { useRef,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowEditor from "../components/FlowEditor";
import { FlowWrapper } from "../components/style-components/AppWrapper";
import PropTypes from "prop-types";
import { getGroups } from "../store/actions/groupActions";
import { useParams } from "react-router-dom";
import FlowTabs from "../components/Global/FlowTabs";
const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();
  useEffect(async () => {
    dispatch(getGroups(flowId));
  }, [])
  const rfWrapper = useRef(null);
  return (
    <ReactFlowProvider>
        <FlowWrapper ref={rfWrapper}>
          <FlowEditor reactFlowWrapper={rfWrapper} />
          {/* <FlowTabs/> */}
        </FlowWrapper>
    </ReactFlowProvider>
  );
}
FlowPage.propTypes = {
  match: PropTypes.object,
};

export default React.memo(FlowPage);