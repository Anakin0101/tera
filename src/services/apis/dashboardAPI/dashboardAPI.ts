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
  DefaultHeadersRequestType,
  BannerDataResponse,
} from './dashboardAPI.types';
import { METHOD_NAMES, URLS } from 'services/constants';
import { TransactionType } from '../productsAPI/productsAPI.types';
import { STAGING_URLS } from 'services/constants/urls';

export const dashboardAPI = createApi({
  reducerPath: 'dashboardAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Dashboard'],
  endpoints: builder => ({
    getTemplates: builder.query<GetTemplatesResponseType, DefaultHeadersRequestType>({
      query: ({ headers }) => ({
        url: URLS.getTemplates,
        method: METHOD_NAMES.GET,
        headers: headers,
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
      }),
    }),
    getOverDraft: builder.query<OverdraftType[], void>({
      query: () => ({
        url: URLS.getOverdraft,
        method: METHOD_NAMES.GET,
      }),
    }),
    getLoanCustomerId: builder.query<LoanType[], void>({
      query: () => ({
        url: URLS.getLoanCustomerId,
        method: METHOD_NAMES.GET,
      }),
    }),
    getAssets: builder.query<Asset[], void>({
      query: () => ({
        url: URLS.getAssets,
        method: METHOD_NAMES.GET,
      }),
    }),
    getBanners: builder.query<BannerDataResponse, any>({
      query: ({ channel, language, page, isCorporate }) => ({
        url: STAGING_URLS.TEST_BASE_URL_FOR_BANNERS,
        method: METHOD_NAMES.GET,
        params: { channel, language, page, isCorporate },
      }),
    }),
    getBanker: builder.query<GetBankerAPIResponseType, void>({
      query: () => ({
        url: URLS.getBankerInfo,
        method: METHOD_NAMES.GET,
      }),
    }),
    saveTemplate: builder.mutation<any, any>({
      query: ({ headers, body }) => ({
        url: URLS.saveTemplate,
        method: METHOD_NAMES.POST,
        headers,
        body,
      }),
    }),
    deleteTemplate: builder.mutation<any, any>({
      query: ({ headers, body }) => ({
        url: URLS.deleteTemplate,
        method: METHOD_NAMES.DELETE,
        headers,
        body,
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
  useGetBannersQuery,
  useSaveTemplateMutation,
  useDeleteTemplateMutation,
} = dashboardAPI;
