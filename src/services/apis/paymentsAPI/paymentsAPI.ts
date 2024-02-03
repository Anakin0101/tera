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
} from './paymentsAPI.types';

export const paymentsAPI = createApi({
  reducerPath: 'paymentsAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Payments'],
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
  }),
});

export const {
  useGetPaymentServicesQuery,
  useGetDebtVerifyBasketMutation,
  useDebtVerifyResultsMutation,
  usePayServiceMutation,
} = paymentsAPI;
