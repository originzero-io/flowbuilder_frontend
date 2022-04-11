import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Modal from "./components/Shared/Modal.jsx";
import SocketConnections from "./SocketConnections";
import { AppWrapper } from "./components/StyledComponents/AppWrapper";
import NotFound from "./navigation/NotFound";
import PrivateRoute from "./navigation/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import DashboardPage from "./pages/DashboardPage";
import FlowPage from "./pages/FlowPage";
import { getMe } from "./store/reducers/authReducer.js";
import LoadingBar from "./components/Shared/LoadingBar.jsx";
import ToastNotification from "./components/Shared/ToastNotification.jsx";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const jwtToken = localStorage.getItem("token");
    // if (jwtToken) {
    //   dispatch(getMe(jwtToken));
    // }
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
      <ToastNotification/>
      <Modal />
      <SocketConnections/>
    </AppWrapper>
  );
};

export default App;
