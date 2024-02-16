import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateProps, IbanInfo, BranchInfo } from './types';
import { dashboardAPI } from 'services/apis';

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
  creditCards: [],
  selectedTransaction: null,
  selectedCardData: null,
  selectedIban: null,
  selectedBranch: null,
  selectedPackage: null,
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
    setSelectedTransaction: (state, { payload }) => {
      state.selectedTransaction = payload;
    },
    setSelectedCardData: (state, { payload }) => {
      state.selectedCardData = payload;
    },
    saveIban: (state, { payload }: { payload: IbanInfo }) => {
      state.selectedIban = payload;
    },
    saveBranch: (state, { payload }: { payload: BranchInfo }) => {
      state.selectedBranch = payload;
    },
    setSelectedPackage: (state, { payload }) => {
      state.selectedPackage = payload;
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
    builder.addMatcher(
      dashboardAPI.endpoints.getCreditCards.matchFulfilled,
      (state, { payload }) => {
        state.creditCards = payload;
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
  setSelectedTransaction,
  setSelectedCardData,
  saveIban,
  saveBranch,
  setSelectedPackage,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
