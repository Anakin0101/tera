import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import {
  GetTemplatesResponseType,
  GetCustomerOperationsResponseTypes,
  GetCustomerOperationsRequestTypes,
  GetLiabilityResponseType,
} from './dashboardAPI.types';
import { URLS } from 'services/constants/urls';
import { METHOD_NAMES } from 'services/constants';

export const dashboardAPI = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Dashboard'],
  endpoints: builder => ({
    getTemplates: builder.query<GetTemplatesResponseType, void>({
      query: () => ({
        url: URLS.getTemplates,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getCustomerOperations: builder.mutation<
      GetCustomerOperationsResponseTypes,
      GetCustomerOperationsRequestTypes
    >({
      query: operations => ({
        url: URLS.getCustomperOps,
        method: METHOD_NAMES.POST,
        body: operations,
      }),
    }),
    getCreditCards: builder.query<any, void>({
      query: () => ({
        url: URLS.getCreditCard,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getOverDraft: builder.query<GetLiabilityResponseType, void>({
      query: () => ({
        url: URLS.getOverdraft,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getLoanCustomerId: builder.query<any, void>({
      query: () => ({
        url: URLS.getLoanCustomerId,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getAssets: builder.query<any, void>({
      query: () => ({
        url: URLS.getAssets,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
      }),
    }),
    getBanker: builder.query<any, void>({
      query: () => ({
        url: URLS.getBankerInfo,
        method: METHOD_NAMES.GET,
        headers: {
          'X-Bank-UserIp': '1',
          'X-Bank-DeviceToken': '1',
        },
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
