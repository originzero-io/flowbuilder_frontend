import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./assets/css/main.css"
import App from "./App";
import "react-notifications/lib/notifications.css";
import "@fortawesome/fontawesome-free/js/brands"
import "@fortawesome/fontawesome-free/js/solid"
import "@fortawesome/fontawesome-free/js/fontawesome"
import 'bootstrap/dist/css/bootstrap.min.css';
//import Popper from 'popper.js';
//import $ from "jquery"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-tabs/style/react-tabs.css';
///REDUX
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./REDUX/reducers/index";
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
