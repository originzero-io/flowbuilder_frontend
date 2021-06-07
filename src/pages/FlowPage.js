import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowEditor from "../components/FlowEditor";
import { FlowWrapper } from "../components/style-components/AppWrapper";
import PropTypes from "prop-types"
export default function FlowPage({match}) {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const elements = useSelector((state) => state.elementReducer).present;
  const dispatch = useDispatch();
  //console.log("params",match)
  useEffect(() => {
    nodeClass.applyElements(elements, dispatch);
  }, [elements]);
  const reactFlowWrapper = useRef(null);
  return (
    <ReactFlowProvider>
      <FlowWrapper ref={reactFlowWrapper}>
        <FlowEditor reactFlowWrapper={reactFlowWrapper} />
      </FlowWrapper>
    </ReactFlowProvider>
  );
}
FlowPage.propTypes = {
  match:PropTypes.object
}
