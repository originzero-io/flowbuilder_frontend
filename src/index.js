import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.js";
import 'reactflow/dist/style.css';

import App from "./App";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.min.css'
import "react-tabs/style/react-tabs.css";
import { Provider } from "react-redux";
import configureAppStore from "./store/configureAppStore";
import ErrorFallback from "./components/Shared/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'

export const store = configureAppStore();

const persistor = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>store.dispatch({type:'RESET'})}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
  </Provider>
);
// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       <BrowserRouter>
//         <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>store.dispatch({type:'RESET'})}>
//           <App />
//         </ErrorBoundary>
//       </BrowserRouter>
//     </PersistGate>
//   </Provider>,
//   rootElement
// );

//reportWebVitals(console.log);
