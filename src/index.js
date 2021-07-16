import ReactDOM from "react-dom";
import React from "react"
import { BrowserRouter } from 'react-router-dom'
import axios from "axios"
import "./assets/css/index.js"
import App from "./App";
import "react-notifications/lib/notifications.css";
import "@fortawesome/fontawesome-free/js/brands"
import "@fortawesome/fontawesome-free/js/solid"
import "@fortawesome/fontawesome-free/js/fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.js";
import { setAuthorizationToken } from "./app-global/helpers/httpHelpers.js";
const store = configureStore();
//axios.defaults.baseURL = 'https://anaks-flow-server.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:5000/';
const jwtToken = localStorage.getItem("token");
if (jwtToken) {
    setAuthorizationToken(jwtToken);
}
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);

//reportWebVitals(console.log);