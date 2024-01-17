import { createSlice } from '@reduxjs/toolkit';
import {
  DepositDurationPayload,
  DepositTypePayload,
  InitialAmountPayload,
  NewDepositStateProps,
  OfferDetailsPayload,
} from './types';

const initialState: NewDepositStateProps = {
  depositType: '',
  initialAmount: 0,
  currency: 'GEL',
  duration: 0,
  interestRate: 0,
  specialInterestRate: 0,
  effectiveInterestRate: 0,
  benefit: 0,
  offer: null,
  productId: 0,
  registrationId: '',
  imageUrl: '',
  creditAccount: {
    id: 0,
    balance: 0,
    iban: '',
  },
  debitAccount: {
    id: 0,
    balance: 0,
    iban: '',
  },
  productName: {
    ka: '',
    en: '',
  },
};

const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    setDepositType: (state, { payload }: DepositTypePayload) => {
      state.depositType = payload.depositType;
      state.imageUrl = payload.imageUrl;
    },
    setInitialAmount: (state, { payload }: InitialAmountPayload) => {
      state.initialAmount = payload.initialAmount;
      state.currency = payload.currency;
      state.creditAccount = payload.creditAccount;
      state.debitAccount = payload.debitAccount;
    },
    setDepositDuration: (state, { payload }: DepositDurationPayload) => {
      state.duration = payload.duration;
      state.productName = payload.productName;
      state.interestRate = payload.interestRate;
      state.specialInterestRate = payload.specialInterestRate;
      state.effectiveInterestRate = payload.effectiveInterestRate;
      state.benefit = payload.benefit;
      state.productId = payload.productId;
    },
    setOfferDetails: (state, { payload }: OfferDetailsPayload) => {
      state.offer = payload;
    },
  },
});

export const { setDepositType, setInitialAmount, setDepositDuration, setOfferDetails } =
  depositSlice.actions;
export const depositReducer = depositSlice.reducer;
