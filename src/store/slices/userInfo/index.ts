import { createSlice } from '@reduxjs/toolkit';
import { UserInfoStateProps } from './types';
import { authAPI } from 'services/apis';

const initialState: UserInfoStateProps = {
  accessToken: '',
  refreshToken: '',
  deviceToken: '',
  otpCode: '',
  ignoreEasyLogin: false,
  postponeEasyLogin: false,
  userProfileInfo: undefined,
  logoutStatus: undefined,
  isPasscodeSet: undefined,
  isBiometricSet: undefined,
  isUsernameSet: undefined,
  passcodeTries: 0,
  isBiometricBeingSet: undefined,
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
    setPasscodeStatus: (state, { payload }) => {
      state.isPasscodeSet = payload;
    },
    setIsBiometricBeingSet: (state, { payload }) => {
      state.isBiometricBeingSet = payload;
    },

    setBiometricStatus: (state, { payload }) => {
      state.isBiometricSet = payload;
    },
    setUserameStatus: (state, { payload }) => {
      state.isUsernameSet = payload;
    },
    setPasscodeTries: (state, { payload }) => {
      state.passcodeTries = payload;
    },
    resetUserProfileInfo: state => {
      state.userProfileInfo = initialState.userProfileInfo;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authAPI.endpoints.getUserProfileInfo.matchFulfilled,
      (state, { payload }) => {
        state.userProfileInfo = payload;
      },
    );
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
  setPasscodeStatus,
  setBiometricStatus,
  setPasscodeTries,
  setIsBiometricBeingSet,
  setAccessToken,
  resetUserProfileInfo,
  setUserameStatus,
  setRefreshToken,
} = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
