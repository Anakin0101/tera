import { createSlice } from '@reduxjs/toolkit';
import { UserInfoStateProps } from './types';
import { authAPI } from 'services/apis';

const initialState: UserInfoStateProps = {
  accessToken: '',
  refreshToken: '',
  deviceToken: '',
  otpCode: '',
  otpCodeErrorTimes: 0,
  ignoreEasyLogin: false,
  postponeEasyLogin: false,
  logoutStatus: undefined,
  isPasscodeSet: undefined,
  isBiometricSet: undefined,
  passcodeTries: 0,
  isBiometricBeingSet: undefined,
  shouldSaveUsername: undefined,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserCredentials: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    resetUserCredentials: state => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload;
    },
    setIgnoreEasyLogin: (state, { payload }) => {
      state.ignoreEasyLogin = payload;
    },
    setPostponeEasyLogin: (state, { payload }) => {
      state.postponeEasyLogin = payload;
    },
    setOTPCode: (state, { payload }) => {
      state.otpCode = payload;
    },
    setOTPCodeErrorTimes: state => {
      state.otpCodeErrorTimes = state.otpCodeErrorTimes + 1;
    },
    setPasscodeStatus: (state, { payload }) => {
      state.isPasscodeSet = payload;
    },
    setIsBiometricBeingSet: (state, { payload }) => {
      state.isBiometricBeingSet = payload;
    },

    setBiometricStatus: (state, { payload }) => {
      state.isBiometricSet = payload;
    },

    setPasscodeTries: (state, { payload }) => {
      state.passcodeTries = payload;
    },
    setShouldSaveUsername: (state, { payload }) => {
      state.shouldSaveUsername = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authAPI.endpoints.logoutUser.matchFulfilled, (state, { payload }) => {
      state.logoutStatus = payload;
    });
  },
});

export const {
  setUserCredentials,
  resetUserCredentials,
  setIgnoreEasyLogin,
  setPostponeEasyLogin,
  setOTPCode,
  setOTPCodeErrorTimes,
  setPasscodeStatus,
  setBiometricStatus,
  setPasscodeTries,
  setIsBiometricBeingSet,
  setAccessToken,
  setRefreshToken,
  setShouldSaveUsername,
} = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
