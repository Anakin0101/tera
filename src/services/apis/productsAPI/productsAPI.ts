import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { URLS } from 'services/constants/urls';
import { METHOD_NAMES } from 'services/constants';
import {
  Account,
  DepositType,
  LastTransactionReq,
  LastTransactionRes,
  LoanType,
  OfferType,
  OffersAPIResponseType,
  TransactionType,
  UpdateAccountNameReq,
} from './productsAPI.types';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    getAccountsByCustomerId: builder.query<Account[], number>({
      query: CustomerId => ({
        url: URLS.getAccountsByCustomerId,
        method: METHOD_NAMES.GET,
        params: {
          CustomerId,
        },
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
    getDeposits: builder.query<DepositType[], number>({
      query: CustomerId => ({
        url: URLS.getDepositsByClientId,
        method: METHOD_NAMES.GET,
        params: {
          CustomerId,
        },
      }),
    }),
    getLoansByCustomerId: builder.query<LoanType[], number>({
      query: CustomerId => ({
        url: URLS.getLoansByCustomerId,
        method: METHOD_NAMES.GET,
        params: {
          CustomerId,
        },
      }),
    }),
    getLastTransactionsByAccNumber: builder.query<TransactionType[], LastTransactionReq>({
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
  }),
});

export const {
  useGetAccountsByCustomerIdQuery,
  useGetOffersQuery,
  useGetDepositsQuery,
  useGetLoansByCustomerIdQuery,
  useGetLastTransactionsByAccNumberQuery,
  useUpdateAccountNameMutation,
} = productsAPI;
