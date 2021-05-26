import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "../../control-panel/side-panels/projects/style";
import LearnPanel from "./learn";
import NotesPanel from "./notes";
import ProjectsPanel from "./projects";
import SettingsPanel from "./settings";
import TeamsPanel from "./teams";
export default function PanelManager() {
  const { activePanel } = useSelector((state) => state.controlPanelReducer);
  const components = {
    Projects: ProjectsPanel,
    Teams: TeamsPanel,
    Notes: NotesPanel,
    Settings: SettingsPanel,
    Learn: LearnPanel,
  };
  const PanelComponent = components[activePanel];
  return (
    <Container>
      <PanelComponent />
    </Container>
  );
}
