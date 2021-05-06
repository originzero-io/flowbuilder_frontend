import React, { useRef, useEffect } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { NotificationContainer } from "react-notifications";
import {
  AppWrapper,
  Screen,
  FlowWrapper,
} from "./components/style-components/AppWrapper";
import AppTooltips from "./components/global/AppTooltips"
import FlowEditor from "./components/flow-editor";
import { useSelector, useDispatch } from "react-redux";
const App = () => {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const elements = useSelector((state) => state.elementReducer);
  const { groupBarDisplay } = useSelector((state) => state.flowConfigReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    nodeClass.applyElements(elements, dispatch);
  }, [elements]);
  const reactFlowWrapper = useRef(null);

  return (
    <AppWrapper>
      <ReactFlowProvider>
        <FlowWrapper ref={reactFlowWrapper}>
          <FlowEditor reactFlowWrapper={reactFlowWrapper} />
        </FlowWrapper>
      </ReactFlowProvider>
      <NotificationContainer />
      <AppTooltips/>
    </AppWrapper>
  );
};
export default App;
