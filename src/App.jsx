import React, { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Modal from "./components/global/Modal.jsx";
import SocketConnections from "./components/global/SocketConnections.jsx";
import { AppWrapper } from "./components/style-components/AppWrapper";
import NotFound from "./navigation/NotFound";
import PrivateRoute from "./navigation/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import DashboardPage from "./pages/DashboardPage";
import FlowPage from "./pages/FlowPage";
import { getMe } from "./store/reducers/authReducer.js";
import LoadingBar from "./components/global/LoadingBar.jsx";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      dispatch(getMe(jwtToken));
    }
  }, []);
  return (
    <AppWrapper>
      <LoadingBar/>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <PrivateRoute path="/panel" component={ControlPanelPage} />
        <PrivateRoute exact path="/flow/:flowId" component={FlowPage} />
        <PrivateRoute
          exact
          path="/dashboard/:dashboardId"
          component={DashboardPage}
        />
        <Route path="*" component={NotFound} />
      </Switch>
      <NotificationContainer />
      <Modal />
      <SocketConnections/>
    </AppWrapper>
  );
};

export default App;
