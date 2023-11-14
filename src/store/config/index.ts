import { reduxStorage } from 'store/reduxStorage';

export const themePersistConfig = {
  key: 'theme',
  storage: reduxStorage,
  whitelist: ['theme', 'darkMode'],
};

export const userInfoPersistConfig = {
  key: 'userInfo',
  storage: reduxStorage,
  whitelist: [
    'accessToken',
    'refreshToken',
    'authorizationMethods',
    'ignoreEasyLogin',
    'postponeEasyLogin',
  ],
};
export const dashboardPersistConfig = {
  key: 'dashboard',
  storage: reduxStorage,
  whitelist: ['templates', 'transactions', 'liabilities'],
};

export const deviceInfoPersistConfig = {
  key: 'deviceInfo',
  storage: reduxStorage,
  whitelist: ['deviceId', 'userAgent', 'osType', 'userIp', 'deviceToken'],
};

export const profilePersistConfig = {
  key: 'profile',
  storage: reduxStorage,
  whitelist: ['customerId'],
};
