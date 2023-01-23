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

export default function configureAppStore() {
  const store = configureStore({
    reducer: persistedReducer,
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
