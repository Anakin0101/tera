import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import {
  GetTemplatesResponseType,
  GetCustomerOperationsResponseTypes,
  GetCustomerOperationsRequestTypes,
  OverdraftType,
  Asset,
  LoanType,
  CreditCardType,
  GetBankerAPIResponseType,
} from './dashboardAPI.types';
import { METHOD_NAMES, URLS } from 'services/constants';
import { TransactionType } from '../productsAPI/productsAPI.types';

export const dashboardAPI = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Dashboard'],
  endpoints: builder => ({
    getTemplates: builder.query<GetTemplatesResponseType, any>({
      query: ({ userIp, deviceToken }) => ({
        url: URLS.getTemplates,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': userIp,
          'X-Bank-DeviceToken': deviceToken,
        },
      }),
    }),
    getCustomerOperations: builder.mutation<TransactionType[], GetCustomerOperationsRequestTypes>({
      query: operations => ({
        url: URLS.getCustomperOps,
        method: METHOD_NAMES.POST,
        body: operations,
      }),
      transformResponse: (response: GetCustomerOperationsResponseTypes) => response.ops,
    }),
    getCreditCards: builder.query<CreditCardType[], void>({
      query: () => ({
        url: URLS.getCreditCard,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getOverDraft: builder.query<OverdraftType[], void>({
      query: () => ({
        url: URLS.getOverdraft,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getLoanCustomerId: builder.query<LoanType[], void>({
      query: () => ({
        url: URLS.getLoanCustomerId,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        url: URLS.getAssets,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getBanker: builder.query<GetBankerAPIResponseType, void>({
      query: () => ({
        url: URLS.getBankerInfo,
        method: METHOD_NAMES.GET,
      }),
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetCustomerOperationsMutation,
  useGetCreditCardsQuery,
  useGetOverDraftQuery,
  useGetLoanCustomerIdQuery,
  useGetAssetsQuery,
  useGetBankerQuery,
} = dashboardAPI;
