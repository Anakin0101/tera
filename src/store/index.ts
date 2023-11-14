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
import { authAPI } from '../services/apis';
import { RESET_STATE_ACTION_TYPE } from './actions/reset';
import { userInfoReducer } from './slices/userInfo';
import {
  dashboardPersistConfig,
  deviceInfoPersistConfig,
  profilePersistConfig,
  themePersistConfig,
  userInfoPersistConfig,
} from './config';
import { dashboardAPI } from 'services/apis/dashboardAPI/dashboardAPI';
import { dashboardReducer } from './slices/dashboard';
import { deviceInfoReducer } from './slices/deviceInfo';
import { profileReducer } from './slices/profile';
import { productsAPI } from 'services/apis/productsAPI/productsAPI';
import { productsReducer } from './slices/products';

const persistedTheme = persistReducer(themePersistConfig, themeReducer);
const persistedUserInfo = persistReducer(userInfoPersistConfig, userInfoReducer);
const persistedDeviceInfo = persistReducer(deviceInfoPersistConfig, deviceInfoReducer);
const persistedDashboard = persistReducer(dashboardPersistConfig, dashboardReducer);
const persistedProfile = persistReducer(profilePersistConfig, profileReducer);

const reducers = combineReducers({
  theme: persistedTheme,
  userInfo: persistedUserInfo,
  deviceInfo: persistedDeviceInfo,
  dashboard: persistedDashboard,
  profile: persistedProfile,
  products: productsReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [dashboardAPI.reducerPath]: dashboardAPI.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
});

const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }
  return reducers(state, action);
};

const middlewares = [authAPI.middleware, dashboardAPI.middleware, productsAPI.middleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducers>;
