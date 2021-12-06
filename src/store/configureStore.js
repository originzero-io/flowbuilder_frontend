/* eslint-disable no-undef */
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("PUBLIC_URL:", process.env.PUBLIC_URL);
  console.log("BASE_URL:", process.env.REACT_APP_BASE_URL);
  //Hot Reloading
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }
  return store;
}
