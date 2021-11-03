import React, { useRef,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowEditor from "../components/FlowEditor";
import { FlowWrapper } from "../components/style-components/AppWrapper";
import PropTypes from "prop-types";
import { loadGroups } from "../store/actions/nodeGroupsActions";
import { useParams } from "react-router-dom";
import FlowTabs from "../components/Global/FlowTabs";
import { getGroupsService } from "../services/groupService";
const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();
  useEffect(async () => {
    const data = await getGroupsService(flowId);
    dispatch(loadGroups(data.groups));
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