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
    'ignoreEasyLogin',
    'postponeEasyLogin',
    'isPasscodeSet',
    'isBiometricSet',
    'passcodeTries',
    'shouldSaveUsername',
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
  whitelist: ['deviceToken', 'userIp'],
};

export const profilePersistConfig = {
  key: 'profile',
  storage: reduxStorage,
};

export const paymentPersistConfig = {
  key: 'paymnets',
  storage: reduxStorage,
};

export const moneyTransfersPersistConfig = {
  key: 'moneyTransfers',
  storage: reduxStorage,
};

export const registerUserPersistConfig = {
  key: 'registerUser',
  storage: reduxStorage,
  whitelist: [],
};
export const applicationStatePersistConfig = {
  key: 'applicationState',
  storage: reduxStorage,
  whitelist: [],
};
