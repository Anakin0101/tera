import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import {
  GetPaymentsServiceParams,
  GetPaymentsServiceResponse,
  GetDebtVerifyBasketResponse,
  GetDebtVerifyBasketParams,
  DebtVerifyInfoResponse,
  DebtVerifyRequestBody,
  PayResponse,
  PayRequestBody,
  AutoPayments,
  AutomPaymentRes,
  AutoPaymentDetails,
  AutoPaymentDetailsRes,
  AutoPaymentDetailsReq,
  AutoPaymentReq,
  AutoPaymentCancelReq,
  AddAutoPaymentRes,
  GetBasketResponse,
  AddBasketResponse,
  AddBasketRequest,
  BasketItemsResponse,
  GetBasketItemsRequestParams,
  AddBasketItemRequestParams,
  AddBasketItemRequestResponse,
  EditBasketRequestParams,
  DeleteBasketRequestBody,
  DeleteBasketItemRequestParams,
} from './paymentsAPI.types';

export const paymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Payments', 'AutoPayments', 'Baskets'],
  endpoints: builder => ({
    getPaymentServices: builder.query<GetPaymentsServiceResponse, GetPaymentsServiceParams>({
      query: ({ isAdult }) => ({
        url: URLS.getPaymentServices,
        method: METHOD_NAMES.GET,
        params: { IsAdult: isAdult },
      }),
    }),
    getDebtVerifyBasket: builder.mutation<GetDebtVerifyBasketResponse, GetDebtVerifyBasketParams>({
      query: params => ({
        url: URLS.getDebtVerifyBasket,
        method: METHOD_NAMES.POST,
        params,
      }),
    }),
    debtVerifyResults: builder.mutation<DebtVerifyInfoResponse, DebtVerifyRequestBody>({
      query: body => ({
        url: URLS.checkDebtVerifyBasket,
        method: METHOD_NAMES.POST,
        params: { notShowError: 1 }, // ეს გაჰარდკოდებულია ვებშიც
        body,
      }),
    }),
    payService: builder.mutation<PayResponse, PayRequestBody>({
      query: body => ({
        url: URLS.payService,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    getAutoPayments: builder.query<AutomPaymentRes[], AutoPayments>({
      query: params => ({
        url: URLS.getAutomPayments,
        params,
      }),
      providesTags: ['AutoPayments'],
    }),
    getAutoPaymentDetails: builder.mutation<AutoPaymentDetails, AutoPaymentDetailsReq>({
      query: body => ({
        url: URLS.getAutomPaymentDetails,
        method: METHOD_NAMES.POST,
        body,
      }),
      transformResponse: (response: AutoPaymentDetailsRes) => response.autoPayment,
    }),
    addAutomaticPayment: builder.mutation<AddAutoPaymentRes, AutoPaymentReq>({
      query: ({ headers, ...body }) => ({
        url: URLS.addAutoPayment,
        method: METHOD_NAMES.POST,
        body,
        headers,
      }),
      invalidatesTags: ['AutoPayments'],
    }),
    cancelAutoPayment: builder.mutation<Partial<AddAutoPaymentRes>, AutoPaymentCancelReq>({
      query: body => ({
        url: URLS.cancelAutoPayment,
        method: METHOD_NAMES.POST,
        body,
      }),
      invalidatesTags: ['AutoPayments'],
    }),
    getBasketsServices: builder.query<GetBasketResponse, void>({
      query: () => ({
        url: URLS.getBaskets,
        method: METHOD_NAMES.GET,
      }),
      providesTags: ['Baskets'],
    }),
    addBasketService: builder.mutation<AddBasketResponse, AddBasketRequest>({
      query: ({ name }) => ({
        url: URLS.addBasket,
        method: METHOD_NAMES.POST,
        params: { name },
      }),
      invalidatesTags: ['Baskets'],
    }),
    getBasketItems: builder.query<BasketItemsResponse, GetBasketItemsRequestParams>({
      query: params => ({
        url: URLS.getBasketItems,
        method: METHOD_NAMES.GET,
        params,
      }),
      providesTags: ['Baskets'],
    }),
    addBasketItem: builder.mutation<AddBasketItemRequestResponse, AddBasketItemRequestParams>({
      query: body => ({
        url: URLS.addBasketItem,
        method: METHOD_NAMES.POST,
        body,
      }),
      invalidatesTags: ['Baskets'],
    }),
    renameBasket: builder.mutation<AddBasketItemRequestResponse, EditBasketRequestParams>({
      query: params => ({
        url: URLS.renameBasket,
        method: METHOD_NAMES.POST,
        params,
      }),
      invalidatesTags: ['Baskets'],
    }),
    deleteBasket: builder.mutation<AddBasketItemRequestResponse, DeleteBasketRequestBody>({
      query: body => ({
        url: URLS.deleteBasket,
        method: METHOD_NAMES.POST,
        body,
      }),
      invalidatesTags: ['Baskets'],
    }),
    debtVerifyBasket: builder.mutation<DebtVerifyInfoResponse, DebtVerifyRequestBody>({
      query: body => ({
        url: URLS.debtVerifyBasket,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    deleteBasketItems: builder.mutation<DebtVerifyInfoResponse, DeleteBasketItemRequestParams>({
      query: body => ({
        url: URLS.deleteBasketItems,
        method: METHOD_NAMES.POST,
        body,
      }),
      invalidatesTags: ['Baskets'],
    }),
  }),
});

export const {
  useGetPaymentServicesQuery,
  useGetDebtVerifyBasketMutation,
  useDebtVerifyResultsMutation,
  usePayServiceMutation,
  useGetAutoPaymentsQuery,
  useGetAutoPaymentDetailsMutation,
  useAddAutomaticPaymentMutation,
  useCancelAutoPaymentMutation,
  useGetBasketsServicesQuery,
  useAddBasketServiceMutation,
  useGetBasketItemsQuery,
  useAddBasketItemMutation,
  useRenameBasketMutation,
  useDeleteBasketMutation,
  useDebtVerifyBasketMutation,
  useDeleteBasketItemsMutation,
} = paymentsAPI;
