import { createSlice } from '@reduxjs/toolkit';
import { ProfileStateProps } from './types';

const initialState: ProfileStateProps = {
  customerId: null,
};

const profileSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCustomerId: (state, { payload }) => {
      state.customerId = payload;
    },
  },
});

export const { setCustomerId } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
