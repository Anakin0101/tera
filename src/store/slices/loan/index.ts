import { createSlice } from '@reduxjs/toolkit';
import {
  MinMaxPaymentDayPayload,
  NewLoanAdditionalDataPayload,
  NewLoanAmountAndDurationPayload,
  NewLoanStateProps,
} from './types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

const initialState: NewLoanStateProps = {
  loanType: '',
  amount: '',
  currency: CurrencyEnum.GEL,
  duration: '',
  productsGroupId: null,
  paymentDate: '',
  typeOfIncome: [],
  income: '',
  workplace: '',
  position: '',
  minPaymentDayAfterRequested: 0,
  maxPaymentDayAfterRequested: 0,
};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setNewLoanAmountAndDuration: (state, { payload }: NewLoanAmountAndDurationPayload) => {
      state.loanType = payload.loanType;
      state.amount = payload.amount;
      state.duration = payload.duration;
      state.currency = payload.currency;
      state.productsGroupId = payload.productsGroupId;
    },
    setNewLoanAdditionalData: (state, { payload }: NewLoanAdditionalDataPayload) => {
      state.paymentDate = payload.paymentDate;
      state.typeOfIncome = payload.typeOfIncome;
      state.income = payload.income;
      state.workplace = payload.workplace;
      state.position = payload.position;
    },
    setMinMaxPaymendDayAfterRequested: (state, { payload }: MinMaxPaymentDayPayload) => {
      state.minPaymentDayAfterRequested = payload.minPaymentDayAfterRequested;
      state.maxPaymentDayAfterRequested = payload.maxPaymentDayAfterRequested;
    },
  },
});

export const {
  setNewLoanAmountAndDuration,
  setNewLoanAdditionalData,
  setMinMaxPaymendDayAfterRequested,
} = loanSlice.actions;
export const loanReducer = loanSlice.reducer;
