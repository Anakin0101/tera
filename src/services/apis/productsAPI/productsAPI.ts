import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { URLS } from 'services/constants/urls';
import { METHOD_NAMES } from 'services/constants';
import {
  Account,
  LastTransactionReq,
  LastTransactionRes,
  LoanHistory,
  LoanSchedule,
  OfferType,
  OffersAPIResponseType,
  TransactionType,
  UpdateAccountNameReq,
} from './productsAPI.types';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Products', 'Transaction'],
  endpoints: builder => ({
    getAccountsByCustomerId: builder.query<Account[], void>({
      query: () => ({
        url: URLS.getAccountsByCustomerId,
        method: METHOD_NAMES.GET,
      }),
    }),
    getOffers: builder.query<OfferType[], number>({
      query: CustomerId => ({
        url: URLS.getOffers,
        method: METHOD_NAMES.GET,
        params: {
          CustomerId,
        },
      }),
      transformResponse: (response: OffersAPIResponseType) => response.offers,
    }),
    getLastTransactionsByAccNumber: builder.mutation<TransactionType[], LastTransactionReq>({
      query: ({ accountNumber, count, startDate, endDate }) => ({
        url: URLS.getCustomerOps,
        method: METHOD_NAMES.POST,
        body: {
          accountNumber,
          count,
          startDate,
          endDate,
        },
      }),
      transformResponse: (response: LastTransactionRes) => response.ops,
    }),
    updateAccountName: builder.mutation<any, UpdateAccountNameReq>({
      query: ({ userId, customerId, channelId, culture, accountId, accountName }) => ({
        url: URLS.getCustomerOps,
        method: METHOD_NAMES.PATCH,
        body: {
          userId,
          customerId,
          channelId,
          culture,
          accountId,
          accountName,
        },
      }),
    }),
    getLoanSchedule: builder.query<LoanSchedule[], number>({
      query: loanId => ({
        url: URLS.getLoanSchedule,
        method: METHOD_NAMES.GET,
        params: { loanId },
      }),
    }),
    getLoanHistory: builder.query<LoanHistory[], number>({
      query: loanId => ({
        url: URLS.getLoanHistory,
        method: METHOD_NAMES.GET,
        params: { loanId },
      }),
    }),
    BlockCard: builder.mutation<any, any>({
      query: ({ cardId }) => ({
        url: URLS.BlockCard,
        method: METHOD_NAMES.POST,
        body: {
          cardId,
        },
      }),
    }),
    UnblockCard: builder.mutation<any, any>({
      query: ({ cardId }) => ({
        url: URLS.UnblockCard,
        method: METHOD_NAMES.POST,
        body: {
          cardId,
        },
      }),
    }),
  }),
});

export const {
  useGetAccountsByCustomerIdQuery,
  useGetOffersQuery,
  useGetLastTransactionsByAccNumberMutation,
  useUpdateAccountNameMutation,
  useGetLoanScheduleQuery,
  useGetLoanHistoryQuery,
  useBlockCardMutation,
  useUnblockCardMutation,
} = productsAPI;
