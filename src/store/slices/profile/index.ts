import { createSlice } from '@reduxjs/toolkit';
import { ProfileStateProps } from './types';
import { profileAPI } from 'services/apis';

const initialState: ProfileStateProps = {
  userProfileInfo: undefined,
};

const profileSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetUserProfileInfo: state => {
      state.userProfileInfo = initialState.userProfileInfo;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      profileAPI.endpoints.getUserProfileInfo.matchFulfilled,
      (state, { payload }) => {
        state.userProfileInfo = payload;
      },
    );
  },
});

export const { resetUserProfileInfo } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
