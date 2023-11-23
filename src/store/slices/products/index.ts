import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateProps } from './types';
import { dashboardAPI } from 'services/apis/dashboardAPI/dashboardAPI';

const initialState: ProductsStateProps = {
  groupedAccountsByIban: [],
  totalAvailableBalanceGEL: 0,
  cards: [],
  lastTransactions: [],
  overdrafts: [],
  deposits: [],
  loans: [],
  totalDepositsGEL: 0,
  totalDebtGEL: 0,
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
    setCards: (state, { payload }) => {
      state.cards = payload;
    },
    setLastTransactions: (state, { payload }) => {
      state.lastTransactions = payload;
    },
    setTotalDeposits: (state, { payload }) => {
      state.totalDepositsGEL = payload;
    },
    setTotalDebt: (state, { payload }) => {
      state.totalDebtGEL = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(dashboardAPI.endpoints.getOverDraft.matchFulfilled, (state, { payload }) => {
      state.overdrafts = payload;
    });
    builder.addMatcher(dashboardAPI.endpoints.getAssets.matchFulfilled, (state, { payload }) => {
      state.deposits = payload;
    });
    builder.addMatcher(
      dashboardAPI.endpoints.getLoanCustomerId.matchFulfilled,
      (state, { payload }) => {
        state.loans = payload;
      },
    );
  },
});

export const {
  setAccounts,
  setTotalAvailableBalance,
  setCards,
  setLastTransactions,
  setTotalDeposits,
  setTotalDebt,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
