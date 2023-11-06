import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import useWorkspace from "utils/hooks/useWorkspace";
import {
  LearnScreen,
  NotesScreen,
  FlowsByProjectPanel,
  SettingsScreen,
  DevicesScreen,
  UsersScreen,
  TeamScreen,
  PermissionScreen,
} from "./index";
import NotFound from "./NotFound";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1d21;
  overflow-y: auto;
  overflow-x: hidden;
`;
const StyledPanelComponentWrapper = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  color: white;
`;
export default function DynamicPanel() {
  const route = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    history.push("/panel/projects");
  }, []);

  return (
    <StyledContainer>
      <StyledPanelComponentWrapper>
        <Switch>
          <Route exact path={`${route.url}/projects`} component={FlowsByProjectPanel} />
          <Route exact path={`${route.url}/team`} component={TeamScreen} />
          <Route exact path={`${route.url}/permissions/:member_id`} component={PermissionScreen} />
          <Route exact path={`${route.url}/learn`} component={LearnScreen} />
          <Route exact path={`${route.url}/notes`} component={NotesScreen} />
          <Route exact path={`${route.url}/devices`} component={DevicesScreen} />
          <Route exact path={`${route.url}/settings`} component={SettingsScreen} />
          <Route exact path={`${route.url}/users`} component={UsersScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </StyledPanelComponentWrapper>
    </StyledContainer>
  );
}
