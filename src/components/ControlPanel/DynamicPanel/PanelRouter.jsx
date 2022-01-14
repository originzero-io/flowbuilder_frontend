import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import styled from "styled-components";
import LearnPanel from "./LearnPanel/LearnPanel";
import NotesPanel from "./NotesPanel/NotesPanel";
import FlowsByProjectPanel from "./ProjectsPanel/FlowsByProjectPanel";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import DevicesPanel from "./DevicesPanel/DevicesPanel";
import UserPanel from "./UserPanel/UserPanel";
import TeamPanel from "./TeamPanel/TeamPanel";
import NotFound from "./NotFound";
import { getFlowsByWorkspace } from "../../../store/reducers/flow/flowReducer";
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
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const { activeWorkspace } = useWorkspace();
  const history = useHistory()
  //page redirects to /panel/all automatically when activeWorkspace changed
  useEffect(() => {
    console.log("burdayım")
    dispatch(getFlowsByWorkspace(activeWorkspace))
    history.push(`${url}/all`);
  }, [activeWorkspace])
  return (
    <Container>
      <PanelComponentWrapper>
        <Switch>
          <Route exact path={`${url}/all`} component={AllFlowsPanel}/>
          <Route exact path={`${url}/projects`} component={FlowsByProjectPanel}/>
          <Route exact path={`${url}/team`} component={TeamPanel}/>
          <Route exact path={`${url}/team/:member_id/permissions`} component={PermissionPage}/>
          <Route exact path={`${url}/learn`} component={LearnPanel}/>
          <Route exact path={`${url}/notes`} component={NotesPanel}/>
          <Route exact path={`${url}/devices`} component={DevicesPanel}/>
          <Route exact path={`${url}/settings`} component={SettingsPanel}/>
          <Route exact path={`${url}/users`} component={UserPanel}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </PanelComponentWrapper>
    </Container>
  );
}
