import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { AppWrapper } from "./components/style-components/AppWrapper";
import FlowPage from "./pages/FlowPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import PrivateRoute from "./navigation/PrivateRoute";
import TabRedirector from "./navigation/TabRedirector";
import NotFound from "./navigation/NotFound";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import * as routes from "./navigation/RouterConfig";
import Modal from "./components/global/Modal.jsx";
import { useDispatch } from "react-redux";
import {
  saveElements,
  setElements,
} from "./store/reducers/flow/flowElementsReducer";
import createSocket from "./services/socketApi";
export const mainNamespace = createSocket("main");
export const elementNamespace = createSocket("elements", {
  query: { data: 'This is for soap' },
  auth: { token: 123 }
});
// const socketTest = io.connect('https://anaks-ws-server.herokuapp.com',{
//   transports: ["websocket"],
//   //reconnectionAttempts: 3,
// });
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Main", mainNamespace);
    console.log("Element", elementNamespace);
    elementNamespace.on("elements:save", (data) => {
      console.log("SAVE-data:", data);
      dispatch(saveElements(data));
    });
    elementNamespace.on("elements:getElements", (data) => {
      console.log("GET-ELEMENTS-data:", data.data);
      dispatch(setElements(data.data));
    });
    elementNamespace.emit("elements:test", "message", (data) => {
      console.log("testten gelen:", data);
    });
    mainNamespace.emit("main:messageFromClient", "Hi there!!!", (data) => {
      console.log("mainnamespaceten gelen:", data);
    });

    
    // socketTest.on('helloMessage', console.log);
    // socketTest.emit('device_request', { data: 'Hello Fatih!' });
    // socketTest.on('server_respond', console.log);
  }, []);
  return (
    <AppWrapper>
      <Switch>
        <Route exact path={routes.AUTH} component={AuthPage} />
        <PrivateRoute path="/panel" component={ControlPanelPage} />
        <PrivateRoute exact path={routes.GOTO_FLOW} component={FlowPage} />
        <PrivateRoute
          exact
          path={routes.GOTO_DASHBOARD}
          component={DashboardPage}
        />
        <PrivateRoute
          exact
          path={routes.CHANGE_TAB}
          component={TabRedirector}
        />
        {/* <Route path="*"><Redirect to={routes.LOGIN}/></Route> */}
        <Route path="*" component={NotFound} />
      </Switch>
      <NotificationContainer />
      <Modal />
    </AppWrapper>
  );
};

export default App;
