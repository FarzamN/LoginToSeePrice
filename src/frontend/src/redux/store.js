import { rootReducer } from "./reducers";

import { userApi } from "./actions/userAction";
import { authApi } from "./actions/authAction";
import { settingApi } from "./actions/SettingAction";

import zakhira from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import { storeApi } from "./actions/storeAction";

const persistConfig = {
  key: "root",
  storage: zakhira,
  whitelist: [
    "auth",
    "getPackages",
    "getSetting",
    "getStoreID",
    authApi.reducerPath,
    userApi.reducerPath,
    settingApi.reducerPath,
    storeApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  storage: zakhira,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      userApi.middleware,
      settingApi.middleware,
      storeApi.middleware
    ),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };
