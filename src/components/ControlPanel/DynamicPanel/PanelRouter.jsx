import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import LearnPanel from "./LearnPanel/LearnPanel";
import NotesPanel from "./NotesPanel/NotesPanel";
import FlowsByProjectPanel from "./ProjectsPanel/FlowsByProjectPanel";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import DevicesPanel from "./DevicesPanel/DevicesPanel";
import UserPanel from "./UserPanel/UserPanel";
import TeamPanel from "./TeamPanel/TeamPanel";
import NotFound from "./NotFound";
import useWorkspace from "../../../utils/useWorkspace";
import { useDispatch } from "react-redux";
import AllFlowsPanel from "./ProjectsPanel/AllFlowsPanel";
import PermissionPage from "./TeamPanel/PermissionPage"
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1d21;
  overflow-y: auto;
  overflow-x: hidden;
`;
const PanelComponentWrapper = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color:white;
`;
export default function PanelRouter() {
  const route = useRouteMatch();
  const location = useLocation();
  const params = useParams();
  const { activeWorkspace } = useWorkspace();
  const history = useHistory()
  //page redirects to /panel/all automatically when activeWorkspace changed
  useEffect(() => {
    console.log("Route: ",route);
    console.log("Location: ",location);
    console.log("Params: ",params);
    history.push(`${route.url}/all`);
  }, [activeWorkspace])
  return (
    <Container>
      <PanelComponentWrapper>
        <Switch>
          <Route exact path={`${route.url}/all`} component={AllFlowsPanel}/>
          <Route exact path={`${route.url}/projects`} component={FlowsByProjectPanel}/>
          <Route exact path={`${route.url}/team`} component={TeamPanel}/>
          <Route exact path={`${route.url}/team/:member_id/permissions`} component={PermissionPage}/>
          <Route exact path={`${route.url}/learn`} component={LearnPanel}/>
          <Route exact path={`${route.url}/notes`} component={NotesPanel}/>
          <Route exact path={`${route.url}/devices`} component={DevicesPanel}/>
          <Route exact path={`${route.url}/settings`} component={SettingsPanel}/>
          <Route exact path={`${route.url}/users`} component={UserPanel}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </PanelComponentWrapper>
    </Container>
  );
}
