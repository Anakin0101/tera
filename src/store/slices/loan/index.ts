import { createSlice } from '@reduxjs/toolkit';
import {
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
  paymentDate: '',
  typeOfIncome: [],
  income: '',
  workplace: '',
  position: '',
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
    },
    setNewLoanAdditionalData: (state, { payload }: NewLoanAdditionalDataPayload) => {
      state.paymentDate = payload.paymentDate;
      state.typeOfIncome = payload.typeOfIncome;
      state.income = payload.income;
      state.workplace = payload.workplace;
      state.position = payload.position;
    },
  },
});

export const { setNewLoanAmountAndDuration, setNewLoanAdditionalData } = loanSlice.actions;
export const loanReducer = loanSlice.reducer;
