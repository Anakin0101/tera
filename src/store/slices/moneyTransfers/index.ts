import { createSlice } from '@reduxjs/toolkit';
import { MoneyTransferServiceStateProps } from './types';
import { moneyTransfersAPI } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI';

const initialState: MoneyTransferServiceStateProps = {
  mtSystem: null,
};

const moneyTransfersSlice = createSlice({
  name: 'moneyTransfers',
  initialState,
  reducers: {
    resetMoneyTransfersServiceInfo: state => {
      state.mtSystem = initialState.mtSystem;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      moneyTransfersAPI.endpoints.getTwrMTSystems.matchFulfilled,
      (state, { payload }) => {
        state.mtSystem = payload?.mtSystem;
      },
    );
  },
});

export const { resetMoneyTransfersServiceInfo } = moneyTransfersSlice.actions;
export const moneyTransfersReducer = moneyTransfersSlice.reducer;
