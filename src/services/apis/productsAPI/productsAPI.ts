import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithInterceptor } from 'services/api';
import { METHOD_NAMES, URLS } from 'services/constants';
import {
  Account,
  ActivateDepositReq,
  AddOrUpdateTeraWalletReq,
  CalculateDeposit,
  CalculateDepositRes,
  InterestRate,
  InterestRatesReq,
  InterestRatesRes,
  LastTransactionReq,
  LastTransactionRes,
  LmsProduct,
  LoanConfigRes,
  LoanHistory,
  LoanSchedule,
  OfferDetails,
  OfferType,
  RegisterDepositReq,
  RegisterDepositRes,
  RequestForLoanConsentTexts,
  RequestForLoanReq,
  TeraWalletPDFReq,
  TeraWalletRes,
  TransactionType,
  UpdateAccountNameReq,
} from './productsAPI.types';
import { store } from 'store/index';
import { setMinMaxPaymendDayAfterRequested } from 'store/slices/loan';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Products', 'Transaction', 'Loan'],
  endpoints: builder => ({
    getAccountsByCustomerId: builder.query<Account[], void>({
      query: () => ({
        url: URLS.getAccountsByCustomerId,
        method: METHOD_NAMES.GET,
      }),
    }),
    getOffers: builder.query<OfferType[], void>({
      query: () => ({
        url: URLS.getOffers,
      }),
    }),
    getLastTransactionsByAccNumber: builder.mutation<TransactionType[], LastTransactionReq>({
      query: ({ accountNumber, count, startDate, endDate }) => ({
        url: URLS.getCustomerOps,
        method: METHOD_NAMES.POST,
        body: {
          accountNumber,
          count,
          startDate,
          endDate,
        },
      }),
      transformResponse: (response: LastTransactionRes) => response.ops,
    }),
    updateAccountName: builder.mutation<any, UpdateAccountNameReq>({
      query: ({ userId, customerId, channelId, culture, accountId, accountName }) => ({
        url: URLS.getCustomerOps,
        method: METHOD_NAMES.PATCH,
        body: {
          userId,
          customerId,
          channelId,
          culture,
          accountId,
          accountName,
        },
      }),
    }),
    getLoanSchedule: builder.query<LoanSchedule[], number>({
      query: loanId => ({
        url: URLS.getLoanSchedule,
        method: METHOD_NAMES.GET,
        params: { loanId },
      }),
    }),
    getLoanHistory: builder.query<LoanHistory[], number>({
      query: loanId => ({
        url: URLS.getLoanHistory,
        method: METHOD_NAMES.GET,
        params: { loanId },
      }),
    }),
    BlockCard: builder.mutation<any, any>({
      query: ({ cardId }) => ({
        url: URLS.BlockCard,
        method: METHOD_NAMES.POST,
        body: {
          cardId,
        },
      }),
    }),
    UnblockCard: builder.mutation<any, any>({
      query: ({ cardId }) => ({
        url: URLS.UnblockCard,
        method: METHOD_NAMES.POST,
        body: {
          cardId,
        },
      }),
    }),
    getOfferById: builder.query<OfferDetails, number>({
      query: OfferId => ({
        url: URLS.getOfferById,
        method: METHOD_NAMES.GET,
        params: { OfferId },
      }),
    }),

    getInterestRates: builder.query<InterestRate[], InterestRatesReq>({
      query: params => ({
        url: URLS.getInterestRates,
        method: METHOD_NAMES.GET,
        params,
      }),
      transformResponse: (response: InterestRatesRes) => response.interestRates,
    }),

    calculateDeposit: builder.mutation<number, CalculateDeposit>({
      query: body => ({
        url: URLS.calculateDeposit,
        method: METHOD_NAMES.POST,
        body,
      }),
      transformResponse: (response: CalculateDepositRes) => response.benefit,
    }),

    registerDeposit: builder.mutation<RegisterDepositRes, RegisterDepositReq>({
      query: body => ({
        url: URLS.registerDeposit,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),

    activateDeposit: builder.mutation<any, ActivateDepositReq>({
      query: body => ({
        url: URLS.activateDeposit,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),

    getTeraWalletInfo: builder.query<TeraWalletRes, void>({
      query: () => ({
        url: URLS.getTeraWalletInfo,
        method: METHOD_NAMES.GET,
      }),
    }),

    generateTeraWalletPdf: builder.mutation<string, TeraWalletPDFReq>({
      query: body => ({
        url: URLS.generateTeraWalletPdf,
        method: METHOD_NAMES.POST,
        body: {
          ...body,
          isCheckedAgreement: false,
          culture: 'ka',
        },
        responseHandler: 'text',
      }),
    }),

    addOrUpdateTeraWallet: builder.mutation<any, AddOrUpdateTeraWalletReq>({
      query: body => ({
        url: URLS.addOrUpdateTeraWallet,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),

    getRequestForLoanConfig: builder.query<LmsProduct[], void>({
      query: () => ({
        url: URLS.getRequestForLoanConfig,
      }),
      transformResponse: (response: LoanConfigRes) => {
        store.dispatch(
          setMinMaxPaymendDayAfterRequested({
            minPaymentDayAfterRequested: response.minPaymentDayAfterRequested,
            maxPaymentDayAfterRequested: response.maxPaymentDayAfterRequested,
          }),
        );

        return response.lmsProducts;
      },
    }),

    getRequestForLoanConsentText: builder.query<RequestForLoanConsentTexts, string>({
      query: culture => ({
        url: URLS.getRequestForLoanConsentTexts,
        params: { culture },
      }),
    }),

    requestForLoan: builder.mutation<{}, Partial<RequestForLoanReq>>({
      query: body => ({
        url: URLS.requestForLoan,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
  }),
});

export const {
  useGetAccountsByCustomerIdQuery,
  useGetOffersQuery,
  useGetLastTransactionsByAccNumberMutation,
  useUpdateAccountNameMutation,
  useGetLoanScheduleQuery,
  useGetLoanHistoryQuery,
  useBlockCardMutation,
  useUnblockCardMutation,
  useGetOfferByIdQuery,
  useGetInterestRatesQuery,
  useCalculateDepositMutation,
  useRegisterDepositMutation,
  useActivateDepositMutation,
  useGetTeraWalletInfoQuery,
  useGenerateTeraWalletPdfMutation,
  useAddOrUpdateTeraWalletMutation,
  useGetRequestForLoanConfigQuery,
  useRequestForLoanMutation,
  useGetRequestForLoanConsentTextQuery,
} = productsAPI;
