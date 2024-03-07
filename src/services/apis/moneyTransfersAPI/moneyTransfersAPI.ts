import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import {
  FindTransferRequestParams,
  FindTransferResponse,
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
  }),
});

export const { useGetTwrMTSystemsQuery, useLazyFindTransferQuery } = moneyTransfersAPI;
