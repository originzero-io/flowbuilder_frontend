/* eslint-disable no-undef */

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: 'persist-key',
  storage,
  whitelist:['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//? if you want to persistance, change rootReducer to persistedReducer in reducer property
export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: process.env.REACT_APP_HOST_ENV === "development" ? true : false
  });

  if (process.env.REACT_APP_HOST_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}
