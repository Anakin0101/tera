import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateProps } from './types';

const initialState: ProductsStateProps = {
  groupedAccountsByIban: [],
  totalAvailableBalanceGEL: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAccounts: (state, { payload }) => {
      state.groupedAccountsByIban = payload;
    },
    setTotalAvailableBalance: (state, { payload }) => {
      state.totalAvailableBalanceGEL = payload;
    },
  },
});

export const { setAccounts, setTotalAvailableBalance } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
