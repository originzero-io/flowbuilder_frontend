import React from "react";
import LearnPanel from "./LearnPanel";
import NotesPanel from "./NotesPanel";
import ProjectsPanel from "./ProjectsPanel";
import SettingsPanel from "./SettingsPanel";
import DevicesPanel from "./DevicesPanel";
import TopMenu from "./TopMenu";
import styled from "styled-components";
import { Switch, Route, useRouteMatch } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #0E1217;
  overflow-y: auto;
  overflow-x: hidden;
`;
const PanelComponentWrapper = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
`;
export default function PanelRouter() {
  const { url } = useRouteMatch();
  return (
    <Container>
      <TopMenu />
      <PanelComponentWrapper>
        <Switch>
          <Route exact path={`${url}/all`} component={ProjectsPanel}/>
          <Route exact path={`${url}/projects`} component={ProjectsPanel}/>
          <Route exact path={`${url}/learn`} component={LearnPanel}/>
          <Route exact path={`${url}/notes`} component={NotesPanel}/>
          <Route exact path={`${url}/devices`} component={DevicesPanel}/>
          <Route exact path={`${url}/settings`} component={SettingsPanel}/>
        </Switch>
      </PanelComponentWrapper>
    </Container>
  );
}
