import { createSlice } from '@reduxjs/toolkit';
import { TeraWalletStateProps, WalletDataPayload } from './types';

const initialState: TeraWalletStateProps = {
  accountId: null,
  amountId: null,
  currency: 'GEL',
};

const teraWalletSlice = createSlice({
  name: 'terawallet',
  initialState,
  reducers: {
    setWalletData: (state, { payload }: WalletDataPayload) => {
      state.accountId = payload.accountId;
      state.amountId = payload.amountId;
      state.currency = payload.currency;
    },
  },
});

export const { setWalletData } = teraWalletSlice.actions;
export const teraWalletReducer = teraWalletSlice.reducer;
