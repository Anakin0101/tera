import { createSlice } from '@reduxjs/toolkit';
import { ProductsStateProps, IbanInfo, BranchInfo } from './types';
import { productsAPI } from 'services/apis';
import { AccountTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { groupAccountsByIban } from 'utils/groupData';
import { calculateSum } from 'utils/calculateSum';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

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
  },
  extraReducers: builder => {
    builder.addMatcher(
      productsAPI.endpoints.getAccountsByCustomerId.matchFulfilled,
      (state, { payload }) => {
        const accounts = payload?.filter(
          ({ accountType }) => accountType !== AccountTypeEnum.Deposit,
        );
        const balanceGEL = accounts?.filter(account => account?.ccy === CurrencyEnum.GEL);
        state.groupedAccountsByIban = groupAccountsByIban(accounts, 'accountIban');
        state.totalAvailableBalanceGEL = calculateSum(balanceGEL, 'balance');
      },
    );
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
  setCards,
  setLastTransactions,
  setTotalDeposits,
  setTotalDebt,
  setSelectedTransaction,
  setSelectedCardData,
  saveIban,
  saveBranch,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
