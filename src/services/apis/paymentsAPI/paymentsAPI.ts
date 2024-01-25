import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import { GetPaymentsServiceParams, GetPaymentsServiceResponse } from './paymentsAPI.types';

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
  }),
});

export const { useGetPaymentServicesQuery } = paymentsAPI;
