import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { themeReducer } from './slices/theme';
import { RESET_STATE_ACTION_TYPE } from './actions/reset';
import { userInfoReducer } from './slices/userInfo';
import { registerUserReducer } from './slices/registerUser';
import {
  dashboardPersistConfig,
  deviceInfoPersistConfig,
  profilePersistConfig,
  registerUserPersistConfig,
  themePersistConfig,
  userInfoPersistConfig,
} from './config';
import { dashboardReducer } from './slices/dashboard';
import { deviceInfoReducer } from './slices/deviceInfo';
import { profileReducer } from './slices/profile';
import {
  productsAPI,
  authAPI,
  dashboardAPI,
  filesAPI,
  profileAPI,
  transfersAPI,
} from 'services/apis';
import { productsReducer } from './slices/products';
import { depositReducer } from './slices/deposit';
import { teraWalletReducer } from './slices/teraWallet';
import { transfersReducer } from './slices/transfers';
import { loanReducer } from './slices/loan';

const __DEV__ = process.env.NODE_ENV === 'development';

const persistedTheme = persistReducer(themePersistConfig, themeReducer);
const persistedUserInfo = persistReducer(userInfoPersistConfig, userInfoReducer);
const persistedDeviceInfo = persistReducer(deviceInfoPersistConfig, deviceInfoReducer);
const persistedDashboard = persistReducer(dashboardPersistConfig, dashboardReducer);
const persistedProfile = persistReducer(profilePersistConfig, profileReducer);
const persistedUserRegister = persistReducer(registerUserPersistConfig, registerUserReducer);

const reducers = combineReducers({
  theme: persistedTheme,
  userInfo: persistedUserInfo,
  deviceInfo: persistedDeviceInfo,
  dashboard: persistedDashboard,
  profile: persistedProfile,
  products: productsReducer,
  transfers: transfersReducer,
  deposit: depositReducer,
  teraWallet: teraWalletReducer,
  loan: loanReducer,
  registerUser: persistedUserRegister,
  [authAPI.reducerPath]: authAPI.reducer,
  [dashboardAPI.reducerPath]: dashboardAPI.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
  [transfersAPI.reducerPath]: transfersAPI.reducer,
  [filesAPI.reducerPath]: filesAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
});

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return reducers(state, action);
};

const middlewares = [
  authAPI.middleware,
  dashboardAPI.middleware,
  productsAPI.middleware,
  transfersAPI.middleware,
  filesAPI.middleware,
  profileAPI.middleware,
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: __DEV__
        ? false
        : {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    }).concat(middlewares),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
