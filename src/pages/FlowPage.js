import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactFlowProvider } from "react-flow-renderer";
import FlowEditor from "../components/FlowEditor";
import { FlowWrapper } from "../components/style-components/AppWrapper";

export default function FlowPage() {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const elements = useSelector((state) => state.elementReducer).present;
  const dispatch = useDispatch();
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
