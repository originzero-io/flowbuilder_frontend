import React, { useEffect } from "react";
import styled from "styled-components";
import flowExecutorSocket from "services/flowExecutorService/flowExecutor.event";
import NavigationPanel from "../components/ControlPanel/NavigationPanel/NavigationPanel";
import WorkspacePanel from "../components/ControlPanel/WorkspacePanel/WorkspacePanel.jsx";
import DynamicPanel, { TopMenu } from "../components/ControlPanel/DynamicPanel";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const StyledContent = styled.div`
  display: flex;
  height: 100vh;
`;

export default function ControlPanelPage() {
  useEffect(() => {
    // flowExecutorSocket.leaveAllRooms();
    // flowExecutorSocket.removeAllListeners();
  }, []);
  return (
    <StyledWrapper>
      <TopMenu />
      <StyledContent>
        <WorkspacePanel />
        <NavigationPanel />
        <DynamicPanel />
      </StyledContent>
    </StyledWrapper>
  );
}
