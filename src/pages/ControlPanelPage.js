import React from "react";
import NavigationPanel from "../components/ControlPanel/NavigationPanel";
import PanelRouter from "../components/ControlPanel/DynamicPanel/PanelRouter";
import styled from "styled-components";
import FlowTabs from "../components/Global/FlowTabs";
import WorkspaceList from "../components/ControlPanel/WorkspacePanel/WorkspaceList.jsx";
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
export default function ControlPanelPage() {
  return (
    <Wrapper>
      <WorkspaceList />
      <NavigationPanel />
      <PanelRouter />
      {/* <FlowTabs /> */}
    </Wrapper>
  );
}
