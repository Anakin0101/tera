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
  userProfileInfo: {
    loading: false,
    error: undefined,
    profileInfo: null,
  },
  isLoggingOut: false,
  isPasscodeSet: undefined,
  isBiometricSet: undefined,
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
      state.accessToken = '';
      state.refreshToken = '';
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
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
    setPasscodeTries: (state, { payload }) => {
      state.passcodeTries = payload;
    },
    resetUserProfileInfo: state => {
      state.userProfileInfo = {
        loading: false,
        error: undefined,
        profileInfo: null,
      };
    },
    setIsLoggingOut: (state, { payload }) => {
      state.isLoggingOut = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authAPI.endpoints.getUserProfileInfo.matchPending, state => {
        state.userProfileInfo.loading = true;
      })
      .addMatcher(authAPI.endpoints.getUserProfileInfo.matchFulfilled, (state, { payload }) => {
        state.userProfileInfo.loading = false;
        state.userProfileInfo.profileInfo = payload;
      })
      .addMatcher(authAPI.endpoints.getUserProfileInfo.matchRejected, (state, { payload }) => {
        state.userProfileInfo.error = payload;
        state.userProfileInfo.loading = false;
      });
    builder
      .addMatcher(authAPI.endpoints.logoutUser.matchPending, state => {
        state.isLoggingOut = true;
      })
      .addMatcher(authAPI.endpoints.logoutUser.matchFulfilled, state => {
        state.postponeEasyLogin = initialState.postponeEasyLogin;
        state.isLoggingOut = false;
        state.accessToken = initialState.accessToken;
        state.userProfileInfo = initialState.userProfileInfo;
      })
      .addMatcher(authAPI.endpoints.logoutUser.matchRejected, state => {
        state.isLoggingOut = false;
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
  setIsLoggingOut,
} = userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
