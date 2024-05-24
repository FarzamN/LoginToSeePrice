import { userApi } from "../actions/userAction";
import { authApi } from "../actions/authAction";
import { combineReducers } from "@reduxjs/toolkit";
import { settingApi } from "../actions/SettingAction";
import { storeApi } from "../actions/storeAction";

import {
  authSlice,
  getPackagesSlice,
  getSettingSlice,
  getStoreIdSlice,
} from "../slices";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  getPackages: getPackagesSlice.reducer,
  getSetting: getSettingSlice.reducer,
  getStoreId: getStoreIdSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
});

export { rootReducer };
