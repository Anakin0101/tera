import { createSlice } from '@reduxjs/toolkit';
import { DepositDurationPayload, InitialAmountPayload, NewDepositStateProps } from './types';

const initialState: NewDepositStateProps = {
  depositType: '',
  initialAmount: 0,
  currency: 'GEL',
  initAccount: '',
  initAccountAvailableBalance: 0,
  finalAccount: '',
  finalAccountAvailableBalance: 0,
  duration: 0,
  withdrawalPeriod: '',
  interestRate: 0,
  specialInterestRate: 0,
  effectiveInterestRate: 0,
  benefit: 0,
};

const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    setDepositType: (state, { payload }) => {
      state.depositType = payload;
    },
    setInitialAmount: (state, { payload }: InitialAmountPayload) => {
      state.initialAmount = payload.initialAmount;
      state.currency = payload.currency;
      state.initAccount = payload.initAccount;
      state.finalAccount = payload.finalAccount;
      state.initAccountAvailableBalance = payload.initAccountAvailableBalance;
      state.finalAccountAvailableBalance = payload.finalAccountAvailableBalance;
    },
    setDepositDuration: (state, { payload }: DepositDurationPayload) => {
      state.duration = payload.duration;
      state.withdrawalPeriod = payload.withdrawalPeriod;
      state.interestRate = payload.interestRate;
      state.specialInterestRate = payload.specialInterestRate;
      state.effectiveInterestRate = payload.effectiveInterestRate;
      state.benefit = payload.benefit;
    },
  },
});

export const { setDepositType, setInitialAmount, setDepositDuration } = depositSlice.actions;
export const depositReducer = depositSlice.reducer;
