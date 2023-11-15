import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateProps } from './types';
import { dashboardAPI } from 'services/apis/dashboardAPI/dashboardAPI';

const initialState: ProductsStateProps = {
  groupedAccountsByIban: [],
  totalAvailableBalanceGEL: 0,
  cards: [],
  lastTransactions: [],
  overdrafts: [],
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
  },
  extraReducers: builder => {
    builder.addMatcher(dashboardAPI.endpoints.getOverDraft.matchFulfilled, (state, { payload }) => {
      state.overdrafts = payload;
    });
  },
});

export const { setAccounts, setTotalAvailableBalance, setCards, setLastTransactions } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
