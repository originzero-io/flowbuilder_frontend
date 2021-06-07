import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./styles";
import LearnPanel from "./Learn";
import NotesPanel from "./Notes";
import ProjectsPanel from "./Projects";
import SettingsPanel from "./Settings";
import TeamsPanel from "./Teams";
import DevicesPanel from "./Devices";
export default function PanelManager() {
  const { activePanel } = useSelector((state) => state.controlPanelReducer);
  const components = {
    Projects: ProjectsPanel,
    Teams: TeamsPanel,
    Notes: NotesPanel,
    Settings: SettingsPanel,
    Learn: LearnPanel,
    Devices: DevicesPanel
  };
  const PanelComponent = components[activePanel];
  return (
    <Container>
        <PanelComponent />
    </Container>
  );
}
