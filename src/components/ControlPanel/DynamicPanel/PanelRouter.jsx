import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import LearnPanel from "./LearnPanel/LearnPanel";
import NotesPanel from "./NotesPanel/NotesPanel";
import ProjectsPanel from "./ProjectsPanel/ProjectsPanel";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import DevicesPanel from "./DevicesPanel/DevicesPanel";
import UserPanel from "./UserPanel/UserPanel";
import TeamPanel from "./TeamPanel/TeamPanel";

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
      <PanelComponentWrapper>
        <Switch>
          <Route exact path={`${url}/all`} component={ProjectsPanel}/>
          <Route exact path={`${url}/projects`} component={ProjectsPanel}/>
          <Route exact path={`${url}/team`} component={TeamPanel}/>
          <Route exact path={`${url}/learn`} component={LearnPanel}/>
          <Route exact path={`${url}/notes`} component={NotesPanel}/>
          <Route exact path={`${url}/devices`} component={DevicesPanel}/>
          <Route exact path={`${url}/settings`} component={SettingsPanel}/>
          <Route exact path={`${url}/users`} component={UserPanel}/>
        </Switch>
      </PanelComponentWrapper>
    </Container>
  );
}
