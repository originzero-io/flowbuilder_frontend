/* eslint-disable no-undef */
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: 'persist-key',
  storage,
  blacklist: ['activeFlow']
}


export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);


  //persisting
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, preloadedState, composedEnhancers);
  
  const persistor = persistStore(store);
  //Hot Reloading
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }
  return { store, persistor };
}
