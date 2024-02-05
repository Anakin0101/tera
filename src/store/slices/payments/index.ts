import { createSlice } from '@reduxjs/toolkit';
import { PaymentServiceStateProps } from './types';
import { paymentsAPI } from 'services/apis/paymentsAPI/paymentsAPI';

const initialState: PaymentServiceStateProps = {
  providersGroups: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    resetPaymentServiceInfo: state => {
      state.providersGroups = initialState.providersGroups;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      paymentsAPI.endpoints.getPaymentServices.matchFulfilled,
      (state, { payload }) => {
        state.providersGroups = payload?.providersGroups;
      },
    );
  },
});

export const { resetPaymentServiceInfo } = paymentsSlice.actions;
export const paymentsReducer = paymentsSlice.reducer;
