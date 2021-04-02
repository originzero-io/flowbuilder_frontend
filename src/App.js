import React, { useRef,useEffect } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import { NotificationContainer } from "react-notifications";
import {
  AppWrapper,
  FlowWrapper,
} from "./components/style-components/AppWrapper";
import FlowEditor from "./components/flow-editor/FlowEditor";
import AppMenu from "./components/menus/index";
import { useSelector, useDispatch } from "react-redux";
const App = () => {
  const nodeClass = useSelector((state) => state.nodeClassReducer);
  const elements = useSelector((state) => state.elementReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    nodeClass.applyElements(elements, dispatch);
  }, [elements]);
  const reactFlowWrapper = useRef(null);

  return (
    <AppWrapper>
      <ReactFlowProvider>
        <AppMenu></AppMenu>
        <FlowWrapper ref={reactFlowWrapper}>
          <FlowEditor reactFlowWrapper={reactFlowWrapper} />
        </FlowWrapper>
      </ReactFlowProvider>
      <NotificationContainer />
    </AppWrapper>
  );
};
export default App;
