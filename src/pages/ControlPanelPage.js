import React, { useEffect } from "react";
import styled from "styled-components";
import { flowExecutorNamespace } from "SocketConnections";
import NavigationPanel from "../components/ControlPanel/NavigationPanel/NavigationPanel";
import WorkspacePanel from "../components/ControlPanel/WorkspacePanel/WorkspacePanel.jsx";
import DynamicPanel, { TopMenu } from "../components/ControlPanel/DynamicPanel";

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
  // console.log("CONTROL_PANEL_PAGE RENDERED")
  useEffect(() => {
    flowExecutorNamespace.emit("leaveAllFlowRooms");
    flowExecutorNamespace.removeAllListeners();
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
