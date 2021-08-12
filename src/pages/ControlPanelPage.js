import React, { useEffect, useState } from "react";
import ControlPanelMenu from "../components/ControlPanel/Menu/PanelMenu";
import ControlPanelManager from "../components/ControlPanel/SidePanel/ControlPanelManager";
import styled from "styled-components";
import FlowTabs from "../components/global/FlowTabs";
import TeamList from "../components/ControlPanel/TeamPanel/TeamList";
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
export default function ControlPanelPage() {
  return (
    <Wrapper>
      <TeamList />
      <ControlPanelMenu />
      <ControlPanelManager />
      {/* <FlowTabs /> */}
    </Wrapper>
  );
}
