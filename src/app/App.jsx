import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import useAuth from "utils/hooks/useAuth.js";
import LoadingBar from "../components/Shared/LoadingBar/LoadingBar.jsx";
import Modal from "../components/Shared/Modal/Modal.jsx";
import ToastNotification from "../components/Shared/Notification/ToastNotification.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import ControlPanelPage from "../pages/ControlPanelPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import FlowPage from "../pages/FlowPage.jsx";
import NotFound from "../routes/NotFound.jsx";
import PrivateRoute from "../routes/PrivateRoute.jsx";
import AppWrapper from "./App.style";
import entityManagerSocketConnection from "./entityManagerSocketConnection.js";

const App = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const configurationSocket = entityManagerSocketConnection();
      return () => {
        configurationSocket.disconnect();
      };
    }
  }, [dispatch, auth]);

  return (
    <AppWrapper>
      <LoadingBar />
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <PrivateRoute path="/panel" component={ControlPanelPage} />
        <PrivateRoute exact path="/flow/:flowId/" component={FlowPage} />
        <PrivateRoute
          exact
          path="/dashboard/:dashboardId"
          component={DashboardPage}
        />
        <Route path="*" component={NotFound} />
      </Switch>
      <ToastNotification />
      <Modal />
    </AppWrapper>
  );
};

export default App;
