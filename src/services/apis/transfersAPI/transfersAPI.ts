import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { URLS } from 'services/constants/urls';
import { METHOD_NAMES } from 'services/constants';
import {
  GetTemplatesResponseType,
  convertAmountBuyRequestType,
  convertAmountSellType,
  convertAmountSellRequestType,
} from './transfersAPI.types';

const commonHeaders = {
  'X-Bank-UserIp': '1',
  'X-Bank-DeviceToken': '1',
};

export const transfersAPI = createApi({
  reducerPath: 'transfersAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Transfers'],
  endpoints: builder => ({
    getTemplates: builder.query<GetTemplatesResponseType, void>({
      query: () => ({
        url: URLS.getTemplates,
        method: METHOD_NAMES.GET,
        headers: commonHeaders,
      }),
    }),

    convertAmountBuy: builder.query<any, convertAmountBuyRequestType>({
      query: ({ amountBuy, currencyBuy, currencySell }) => ({
        url: `${URLS.getAmount}?amountBuy=${amountBuy}&currencyBuy=${currencyBuy}&currencySell=${currencySell}`,
        method: METHOD_NAMES.GET,
        headers: commonHeaders,
      }),
    }),

    convertAmountSell: builder.query<convertAmountSellType, convertAmountSellRequestType>({
      query: ({ amountSell, currencyBuy, currencySell }) => {
        const params = {
          ...(amountSell !== undefined && { amountSell }),
          currencyBuy,
          currencySell,
        };

        return {
          url: `${URLS.getAmount}`,
          method: METHOD_NAMES.GET,
          params,
          headers: commonHeaders,
        };
      },
    }),
    transferToOwnAccount: builder.mutation<any, any>({
      query: operations => ({
        url: URLS.transferToOwnAccount,
        method: METHOD_NAMES.POST,
        body: operations,
      }),
    }),
    exchangeAmount: builder.mutation<any, any>({
      query: operations => ({
        url: URLS.exchange,
        method: METHOD_NAMES.POST,
        body: operations,
      }),
    }),
    checkIban: builder.query<any, any>({
      query: iban => ({
        url: `${URLS.checkIban}?iban=${iban}`,
        method: `${METHOD_NAMES.GET}`,
        headers: commonHeaders,
      }),
    }),
    transferToSomeone: builder.mutation<any, any>({
      query: operations => ({
        url: URLS.transferToSomeone,
        method: METHOD_NAMES.POST,
        body: operations.body,
        headers: operations.headers,
        formData: true,
      }),
    }),
    getTransferInfo: builder.query<any, any>({
      query: ({
        transferType,
        debitAccountId,
        amount,
        fastPayment,
        ensured,
        receiverBankCode,
      }) => ({
        url: `${URLS.getTransferInfo}?transferType=${transferType}&debitAccountId=${debitAccountId}&amount=${amount}&fastPayment=${fastPayment}&ensured=${ensured}&receiverBankCode=${receiverBankCode}`,
        method: METHOD_NAMES.GET,
        headers: commonHeaders,
      }),
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useConvertAmountBuyQuery,
  useConvertAmountSellQuery,
  useTransferToOwnAccountMutation,
  useTransferToSomeoneMutation,
  useExchangeAmountMutation,
  useLazyCheckIbanQuery,
  useLazyGetTransferInfoQuery,
} = transfersAPI;
