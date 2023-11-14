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
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setIgnoreEasyLogin: (state, action) => {
      state.ignoreEasyLogin = action.payload;
    },
    setPostponeEasyLogin: (state, action) => {
      state.postponeEasyLogin = action.payload;
    },
    setOTPCode: (state, action) => {
      state.otpCode = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authAPI.endpoints.getUserProfileInfo.matchPending, state => {
        state.userProfileInfo.loading = true;
      })
      .addMatcher(authAPI.endpoints.getUserProfileInfo.matchFulfilled, (state, action) => {
        state.userProfileInfo.loading = false;
        state.userProfileInfo.profileInfo = action.payload;
      })
      .addMatcher(authAPI.endpoints.getUserProfileInfo.matchRejected, (state, action) => {
        state.userProfileInfo.error = action.payload;
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

export const { setUserCredentials, setIgnoreEasyLogin, setPostponeEasyLogin, setOTPCode } =
  userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
