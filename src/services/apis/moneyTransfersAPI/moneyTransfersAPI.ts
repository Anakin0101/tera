import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import {
  FindTransferRequestParams,
  FindTransferResponse,
  GetMoneyTransferListRequestParams,
  MoneyTransferListResponse,
  ReceiveTransferRequestParams,
  ReceiveTransferResponse,
  ReceiverTsMTSystemsResponse,
} from './moneyTransfersAPI.types';

export const moneyTransfersAPI = createApi({
  reducerPath: 'moneyTransfersAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['moneyTransfers'],
  endpoints: builder => ({
    getTwrMTSystems: builder.query<ReceiverTsMTSystemsResponse, void>({
      query: () => ({
        url: URLS.getTwrMTSystems,
        method: METHOD_NAMES.GET,
      }),
    }),
    findTransfer: builder.query<FindTransferResponse, FindTransferRequestParams>({
      query: params => ({
        url: URLS.findTransfer,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
    receiveTransfer: builder.mutation<ReceiveTransferResponse, ReceiveTransferRequestParams>({
      query: body => ({
        url: URLS.receiveTransfer,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    listCustomerTransfers: builder.query<
      MoneyTransferListResponse,
      GetMoneyTransferListRequestParams
    >({
      query: params => ({
        url: URLS.listCustomerTransfers,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
  }),
});

export const {
  useGetTwrMTSystemsQuery,
  useLazyFindTransferQuery,
  useReceiveTransferMutation,
  useListCustomerTransfersQuery,
} = moneyTransfersAPI;
