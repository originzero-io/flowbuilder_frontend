import React from "react";
import { useSelector } from "react-redux";
import LearnPanel from "./LearnPanel";
import NotesPanel from "./NotesPanel";
import ProjectsPanel from "./ProjectsPanel";
import SettingsPanel from "./SettingsPanel";
import DevicesPanel from "./DevicesPanel";
import TopMenu from "../Menu/TopMenu";
import styled from "styled-components";

const Container = styled.div`
  width:100%;
  height:100%;
  background:#F5F5F6;
  color:black;
  overflow-y:auto;
  overflow-x: hidden;
`
const PanelComponentWrapper = styled.div`
  padding-top: 15px;
  padding-left:15px;
  padding-right:15px;
`
export default function ControlPanelManager() {
  const { activePanel } = useSelector((state) => state.controlPanelReducer);
  const components = {
    Projects: ProjectsPanel,
    Notes: NotesPanel,
    Settings: SettingsPanel,
    Learn: LearnPanel,
    Devices: DevicesPanel,
  };
  const PanelComponent = components[activePanel];
  return (
    <Container>
      <TopMenu />
      <PanelComponentWrapper>
        <PanelComponent />
      </PanelComponentWrapper>
    </Container>
  );
}
