import React, { useEffect } from "react";
import NavigationPanel from "../components/ControlPanel/NavigationPanel/NavigationPanel";
import WorkspacePanel from "../components/ControlPanel/WorkspacePanel/WorkspacePanel.jsx";
import DynamicPanel, { TopMenu } from "../components/ControlPanel/DynamicPanel";
import { useDispatch } from "react-redux";
import { getAllUsers } from "store/reducers/userSlice";
import styled from "styled-components";
import { flowExecutorNamespace } from "SocketConnections";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  height: 100vh;
`;

export default function ControlPanelPage() {
  const dispatch = useDispatch();
  //console.log("CONTROL_PANEL_PAGE RENDERED")
  useEffect(() => {
    dispatch(getAllUsers());
    flowExecutorNamespace.emit('leaveAllFlowRooms');
  }, []);
  return (
    <Wrapper>
      <TopMenu />
      <Content>
        <WorkspacePanel />
        <NavigationPanel />
        <DynamicPanel />
      </Content>
    </Wrapper>
  );
}
