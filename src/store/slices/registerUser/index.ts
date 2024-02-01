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
  flow: 'registration',
};

const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    buildRegisterUserRequest: (state, { payload }: PayloadAction<RegisterUserStateProps>) => ({
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
