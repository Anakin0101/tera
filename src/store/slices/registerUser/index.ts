import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RegisterUserStateProps } from './types';

const initialState: RegisterUserStateProps = {
  personalId: null,
  email: null,
  mobile: null,
  culture: 'ka',
  cardData: null,
  userName: null,
  secretWord: null,
  sendOtp: false,
  otp: null,
};

const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    buildRegisterUserRequest: (state, { payload }: PayloadAction<RegisterUserStateProps>) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { buildRegisterUserRequest } = registerUserSlice.actions;
export const registerUserReducer = registerUserSlice.reducer;
