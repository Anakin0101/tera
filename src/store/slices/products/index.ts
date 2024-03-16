import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateProps, IbanInfo, BranchInfo } from './types';
import { productsAPI } from 'services/apis';

const initialState: ProductsStateProps = {
  groupedAccountsByIban: [],
  totalAvailableBalanceGEL: 0,
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
  transferAccounts: [],
  selectedPackage: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setTransferAccounts: (state, { payload }) => {
      state.transferAccounts = payload;
    },
    setAccounts: (state, { payload }) => {
      state.groupedAccountsByIban = payload;
    },
    setTotalAvailableBalance: (state, { payload }) => {
      state.totalAvailableBalanceGEL = payload;
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
    builder.addMatcher(productsAPI.endpoints.getOverDraft.matchFulfilled, (state, { payload }) => {
      state.overdrafts = payload;
    });
    builder.addMatcher(productsAPI.endpoints.getDeposits.matchFulfilled, (state, { payload }) => {
      state.deposits = payload;
    });
    builder.addMatcher(
      productsAPI.endpoints.getLoanCustomerId.matchFulfilled,
      (state, { payload }) => {
        state.loans = payload;
      },
    );
    builder.addMatcher(
      productsAPI.endpoints.getCreditCards.matchFulfilled,
      (state, { payload }) => {
        state.creditCards = payload;
      },
    );
  },
});

export const {
  setAccounts,
  setTotalAvailableBalance,
  setTotalDeposits,
  setTotalDebt,
  setSelectedTransaction,
  setSelectedCardData,
  saveIban,
  saveBranch,
  setTransferAccounts,
  setSelectedPackage,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
