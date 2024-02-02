import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommonStateProps, RecoverPasswordStateProps, RegisterUserStateProps } from './types';

const initialState: CommonStateProps = {
  // registration
  personalId: null,
  email: null,
  mobile: null,
  culture: 'ka',
  cardData: null,
  userName: null,
  secretWord: null,
  sendOtp: false,
  otp: null,
  //   passwordRecovery
  pin: null,
  channelData: '',
  channelId: 0,
  customerBrowser: '',
  customerIp: '',
  defaultLogin: true,
  ignoreEmptyUserNameCheck: true,
  timezoneOffset: 0,
  //   general
  flow: 'registration',
};

const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    buildRegisterUserRequest: (
      state,
      { payload }: PayloadAction<RecoverPasswordStateProps | RegisterUserStateProps>,
    ) => ({
      ...state,
      ...payload,
    }),
    setCurrentFlow: (state, { payload }) => {
      state.flow = payload;
    },
    resetRegisterUser: () => {
      return { ...initialState };
    },
  },
});

export const { buildRegisterUserRequest, setCurrentFlow, resetRegisterUser } =
  registerUserSlice.actions;
export const registerUserReducer = registerUserSlice.reducer;
