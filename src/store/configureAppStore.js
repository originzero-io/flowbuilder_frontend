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
  const store = configureStore({ reducer: persistedReducer });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}
