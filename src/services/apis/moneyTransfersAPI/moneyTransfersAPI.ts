import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import {
  DictionariesParams,
  DictionariesResponse,
  FindTransferRequestParams,
  FindTransferResponse,
  GerCitiesResponse,
  GetAddressRequestParams,
  GetAddressResponse,
  GetCitiesRequestParams,
  GetMoneyTransferListRequestParams,
  GetMtSystemParams,
  GetMtSystemResponse,
  MoneyTransferListResponse,
  MoneyTransferSendRequestParams,
  MoneyTransferSendResponse,
  PrepareTransferRequestParams,
  PrepareTransferResponse,
  ReceiveTransferRequestParams,
  ReceiveTransferResponse,
  ReceiverTsMTSystemsResponse,
  TransferInfoRequestParams,
  TransferInfoResponse,
  TransferStatusRequestParams,
  TransferStatusResponse,
  TsMTSystemsResponse,
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
    getMoneyTransferInfo: builder.query<TransferInfoResponse, TransferInfoRequestParams>({
      query: params => ({
        url: URLS.getMoneyTransferInfo,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
    checkTransferStatus: builder.query<TransferStatusResponse, TransferStatusRequestParams>({
      query: params => ({
        url: URLS.checkTransferStatus,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
    getTsMTSystems: builder.query<TsMTSystemsResponse, void>({
      query: () => ({
        url: URLS.getTsMTSystems,
        method: METHOD_NAMES.GET,
      }),
    }),
    getMTSystem: builder.query<GetMtSystemResponse, GetMtSystemParams>({
      query: params => ({
        url: URLS.getMTSystem,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
    getDirections: builder.query<DictionariesResponse, DictionariesParams>({
      query: params => ({
        url: URLS.getDirections,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
    getCities: builder.query<GerCitiesResponse, GetCitiesRequestParams>({
      query: params => ({
        url: URLS.getCities,
        method: METHOD_NAMES.GET,
        params,
      }),
    }),
    getAddress: builder.mutation<GetAddressResponse, GetAddressRequestParams>({
      query: body => ({
        url: URLS.getAddress,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    prepareTransferSend: builder.mutation<PrepareTransferResponse, PrepareTransferRequestParams>({
      query: body => ({
        url: URLS.prepareTransferSend,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    sendTransfer: builder.mutation<MoneyTransferSendResponse, MoneyTransferSendRequestParams>({
      query: body => ({
        url: URLS.sendTransfer,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
  }),
});

export const {
  useGetTwrMTSystemsQuery,
  useLazyFindTransferQuery,
  useReceiveTransferMutation,
  useListCustomerTransfersQuery,
  useLazyGetMoneyTransferInfoQuery,
  useLazyCheckTransferStatusQuery,
  useGetTsMTSystemsQuery,
  useGetMTSystemQuery,
  useGetDirectionsQuery,
  useLazyGetCitiesQuery,
  useGetAddressMutation,
  usePrepareTransferSendMutation,
  useSendTransferMutation,
} = moneyTransfersAPI;
