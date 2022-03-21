import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import {
  LearnScreen,
  NotesScreen,
  AllFlowsPanel,
  FlowsByProjectPanel,
  SettingsScreen,
  DevicesScreen,
  UsersScreen,
  TeamScreen,
  PermissionScreen,
} from "./index";
import NotFound from "./NotFound";
import useWorkspace from "../../../hooks/useWorkspace";
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
  color: white;
`;
export default function DynamicPanel() {
  const route = useRouteMatch();
  const { activeWorkspace } = useWorkspace();
  const history = useHistory();
  //page redirects to /panel/all automatically when activeWorkspace changed
  useEffect(() => {
    history.push(`${route.url}/all`);
  }, [activeWorkspace]);
  return (
    <Container>
      <PanelComponentWrapper>
        <Switch>
          <Route exact path={`${route.url}/all`} component={AllFlowsPanel} />
          <Route
            exact
            path={`${route.url}/projects`}
            component={FlowsByProjectPanel}
          />
          <Route exact path={`${route.url}/team`} component={TeamScreen} />
          <Route
            exact
            path={`${route.url}/permissions/:member_id`}
            component={PermissionScreen}
          />
          <Route exact path={`${route.url}/learn`} component={LearnScreen} />
          <Route exact path={`${route.url}/notes`} component={NotesScreen} />
          <Route
            exact
            path={`${route.url}/devices`}
            component={DevicesScreen}
          />
          <Route
            exact
            path={`${route.url}/settings`}
            component={SettingsScreen}
          />
          <Route exact path={`${route.url}/users`} component={UsersScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </PanelComponentWrapper>
    </Container>
  );
}
