import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.js";
import App from "./App";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.min.css'
import "react-tabs/style/react-tabs.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.js";
import ErrorFallback from "./components/Shared/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { PersistGate } from "redux-persist/integration/react";
import notification from "utils/notificationHelper";

export const { store, persistor } = configureStore();

// window.onunhandledrejection = function (error) {
//   notification.error(error.reason.response.data.message)
//   console.log("error reason: ",error.reason.response.data.message);
// };

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>store.dispatch({type:'RESET'})}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
);

//reportWebVitals(console.log);
