import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import {
  convertAmountBuyRequestType,
  convertAmountSellType,
  convertAmountSellRequestType,
  TransferToOwnAccountResponseType,
  TransferToOwnAccountRequestType,
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
    transferToOwnAccount: builder.mutation<
      TransferToOwnAccountResponseType,
      TransferToOwnAccountRequestType
    >({
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
    checkPin: builder.query<any, any>({
      query: pin => ({
        url: `${URLS.checkIban}?pin=${pin}`,
        method: `${METHOD_NAMES.GET}`,
        headers: commonHeaders,
      }),
    }),
    checkMobile: builder.query<any, any>({
      query: mobile => ({
        url: `${URLS.checkIban}?mobile=${mobile}`,
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
    p2ptransferToSomeone: builder.mutation<any, any>({
      query: operations => ({
        url: URLS.P2pTransferToSomeone,
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
    checkPersonalNumber: builder.query<any, any>({
      query: pin => ({
        url: `${URLS.checkIban}?pin=${pin}`,
        method: `${METHOD_NAMES.GET}`,
        headers: commonHeaders,
      }),
    }),
  }),
});

export const {
  useConvertAmountBuyQuery,
  useConvertAmountSellQuery,
  useTransferToOwnAccountMutation,
  useTransferToSomeoneMutation,
  useP2ptransferToSomeoneMutation,
  useExchangeAmountMutation,
  useLazyCheckIbanQuery,
  useLazyCheckPinQuery,
  useLazyCheckMobileQuery,
  useLazyGetTransferInfoQuery,
  useLazyCheckPersonalNumberQuery,
} = transfersAPI;
