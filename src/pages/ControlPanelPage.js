import React from "react";
import NavigationMenu from "../components/ControlPanel/Menu/NavMenu";
import TopMenu from "../components/ControlPanel/Menu/TopMenu";
import PanelManager from "../components/ControlPanel/SidePanel/PanelManager";
import { AppWrapper } from "../components/style-components/AppWrapper";
import styled from "styled-components"
import FlowTabs from "../components/global/FlowTabs";
const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  height:100vh;
`
const Content = styled.div`
  display: flex;
  width:100%;
  align-items: stretch;
  justify-content: center;
  height:97vh;
`
export default function ControlPanelPage() {
  return (
    <AppWrapper>
      <Wrapper>
        <TopMenu />
        <Content>
          <NavigationMenu />
          <PanelManager />
        </Content>
      </Wrapper>
      <FlowTabs/>
    </AppWrapper>
  );
}
