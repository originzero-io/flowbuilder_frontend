import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowEditor from "../components/FlowEditor";
import { FlowWrapper } from "../components/style-components/AppWrapper";
import PropTypes from "prop-types";
import { getGroups } from "../store/reducers/flow/flowGroupsReducer";
import { useParams } from "react-router-dom";
import FlowTabs from "../components/global/FlowTabs";
import { saveElements, setElements } from "../store/reducers/flow/flowElementsReducer";
import createSocket from "../services/socketApi";
const FlowPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();
  const onUnload = e => {
    e.preventDefault();
    e.returnValue = 'Some message';
  }
  useEffect(async () => {
    dispatch(getGroups(flowId));

    window.addEventListener("beforeunload", onUnload);
    return () => {
      console.log("FlowPage Unmounting...");
      window.removeEventListener("beforeunload", onUnload);
    }
  }, []);

  const rfWrapper = useRef(null);
  return (
    <ReactFlowProvider>
      <FlowWrapper ref={rfWrapper}>
        <FlowEditor reactFlowWrapper={rfWrapper} />
        {/* <FlowTabs/> */}
      </FlowWrapper>
    </ReactFlowProvider>
  );
};
FlowPage.propTypes = {
  match: PropTypes.object,
};

export default React.memo(FlowPage);
