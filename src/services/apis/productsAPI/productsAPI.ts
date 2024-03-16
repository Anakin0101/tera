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
  BranchesResponse,
  Branch,
  AddCardRequest,
  CustomerOperationsReq,
  CustomerOperationsRes,
  CreditCardType,
  OverdraftType,
  LoanType,
  Deposit,
  ActivatePackage,
  PrintLoanSchedulesReq,
  PrintLoanSchedulesRes,
  TerabytesRes,
  DepositByIdReq,
  DepositByIdRes,
  CreditDisbursementReq,
  PrintAccountRequisites,
  PrintAccountRequisitesRes,
  GetStatementReq,
  CreditDisbursementRes,
  CreditProductOfferAgreementRes,
  CreditProductOfferSchedule,
  ActivateCreditProductOfferReq,
  OfferByIdReq,
  CardInsuranceReq,
  CancelCardInsuranceReq,
  RequestForPin,
} from './productsAPI.types';
import { store } from 'store/index';
import { setMinMaxPaymendDayAfterRequested } from 'store/slices/loan';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [
    'Products',
    'Transactions',
    'Loans',
    'Offers',
    'Accounts',
    'Deposits',
    'CreditProduct',
    'CardInsurance',
  ],
  endpoints: builder => ({
    getAccountsByCustomerId: builder.query<Account[], void>({
      query: () => ({
        url: URLS.getAccountsByCustomerId,
      }),
      providesTags: ['Accounts'],
    }),
    getOffers: builder.query<OfferType[], void>({
      query: () => ({
        url: URLS.getOffers,
      }),
      providesTags: ['Offers', 'CreditProduct'],
    }),
    getCustomerOperations: builder.mutation<TransactionType[], CustomerOperationsReq>({
      query: operations => ({
        url: URLS.getCustomerOps,
        method: METHOD_NAMES.POST,
        body: operations,
      }),
      transformResponse: (response: CustomerOperationsRes) => response.ops,
      invalidatesTags: ['Transactions'],
    }),
    getCreditCards: builder.query<CreditCardType[], void>({
      query: () => ({
        url: URLS.getCreditCard,
      }),
      providesTags: ['Loans'],
    }),
    getOverDraft: builder.query<OverdraftType[], void>({
      query: () => ({
        url: URLS.getOverdraft,
      }),
      providesTags: ['Loans'],
    }),
    getLoanCustomerId: builder.query<LoanType[], void>({
      query: () => ({
        url: URLS.getLoanCustomerId,
      }),
      providesTags: ['Loans'],
    }),
    getDeposits: builder.query<Deposit[], void>({
      query: () => ({
        url: URLS.getDepositByClientId,
      }),
      providesTags: ['Deposits'],
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
    getOfferById: builder.query<OfferDetails, OfferByIdReq>({
      query: params => ({
        url: URLS.getOfferById,
        method: METHOD_NAMES.GET,
        params,
      }),
      providesTags: ['CardInsurance'],
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
      invalidatesTags: ['Deposits'],
    }),

    getTeraWalletInfo: builder.query<TeraWalletRes, void>({
      query: () => ({
        url: URLS.getTeraWalletInfo,
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
    getBranches: builder.mutation<Branch[], void>({
      query: () => ({
        url: URLS.getBranches,
        method: METHOD_NAMES.POST,
      }),
      transformResponse: (response: BranchesResponse) => response.branches,
    }),
    addCard: builder.mutation<void, AddCardRequest>({
      query: body => ({
        url: URLS.addCard,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    activatePackage: builder.mutation<void, ActivatePackage>({
      query: body => ({
        url: URLS.activatePackage,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
    printLoanSchedules: builder.mutation<string, PrintLoanSchedulesReq>({
      query: body => ({
        url: URLS.printLoanSchedules,
        method: METHOD_NAMES.POST,
        body,
      }),
      transformResponse: (response: PrintLoanSchedulesRes) => response.fileId,
    }),
    printLoanPayments: builder.mutation<string, PrintLoanSchedulesReq>({
      query: body => ({
        url: URLS.printLoanPayments,
        method: METHOD_NAMES.POST,
        body,
      }),
      transformResponse: (response: PrintLoanSchedulesRes) => response.fileId,
    }),

    getTerabyte: builder.query<TerabytesRes, void>({
      query: () => ({
        url: URLS.getTerabyte,
      }),
    }),
    getDepositById: builder.query<DepositByIdRes, DepositByIdReq>({
      query: ({ culture, depositId }) => ({
        url: URLS.getDepositById,
        params: {
          depositId,
          culture,
        },
      }),
    }),
    getCreditDisbursementProductOfferDetails: builder.query<
      CreditDisbursementRes,
      CreditDisbursementReq
    >({
      query: ({ creditDisbursementId, culture }) => ({
        url: URLS.getCreditDisbursementProductOfferDetails,
        params: {
          creditDisbursementId,
          culture,
        },
      }),
    }),
    printAccountRequisites: builder.mutation<string, PrintAccountRequisites>({
      query: body => ({
        url: URLS.printAccountRequisites,
        method: METHOD_NAMES.POST,
        body,
      }),
      transformResponse: (response: PrintAccountRequisitesRes) => response.fileId,
    }),
    getStatement: builder.mutation<string, GetStatementReq>({
      query: body => ({
        url: URLS.getStatement,
        method: METHOD_NAMES.POST,
        body,
      }),
      transformResponse: (response: PrintAccountRequisitesRes) => response.fileId,
    }),

    getCreditProductOfferAgreement: builder.query<string, CreditDisbursementReq>({
      query: ({ creditDisbursementId, culture }) => ({
        url: URLS.getCreditProductOfferAgreement,
        params: {
          creditDisbursementId,
          culture,
        },
      }),
      transformResponse: (response: CreditProductOfferAgreementRes) => response.fileId,
    }),

    getCreditProductOfferSchedule: builder.mutation<string, CreditProductOfferSchedule>({
      query: ({ id, culture }) => ({
        url: URLS.getCreditProductOfferSchedule,
        method: METHOD_NAMES.POST,
        body: { id, culture },
      }),
      transformResponse: (response: CreditProductOfferAgreementRes) => response.fileId,
    }),

    activateCreditProductOffer: builder.query<any, ActivateCreditProductOfferReq>({
      query: params => ({
        url: URLS.activateCreditProductOffer,
        params,
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(productsAPI.util.invalidateTags(['CreditProduct']));
        });
      },
    }),

    addCardInsurance: builder.mutation<any, Partial<CardInsuranceReq>>({
      query: body => ({
        url: URLS.addCardInsurance,
        method: METHOD_NAMES.POST,
        body,
      }),
      invalidatesTags: ['Accounts'],
    }),

    cancelCardInsurance: builder.mutation<any, Partial<CancelCardInsuranceReq>>({
      query: body => ({
        url: URLS.cancelCardInsurance,
        method: METHOD_NAMES.POST,
        body,
      }),
      invalidatesTags: ['Accounts'],
    }),

    requestForPin: builder.mutation<any, Partial<RequestForPin>>({
      query: body => ({
        url: URLS.requestForPin,
        method: METHOD_NAMES.POST,
        body,
      }),
    }),
  }),
});

export const {
  useGetAccountsByCustomerIdQuery,
  useGetOffersQuery,
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
  useGetBranchesMutation,
  useAddCardMutation,
  useGetCustomerOperationsMutation,
  useGetCreditCardsQuery,
  useGetOverDraftQuery,
  useGetLoanCustomerIdQuery,
  useGetDepositsQuery,
  useActivatePackageMutation,
  usePrintLoanSchedulesMutation,
  usePrintLoanPaymentsMutation,
  useGetTerabyteQuery,
  useGetDepositByIdQuery,
  useGetCreditDisbursementProductOfferDetailsQuery,
  usePrintAccountRequisitesMutation,
  useGetStatementMutation,
  useGetCreditProductOfferAgreementQuery,
  useGetCreditProductOfferScheduleMutation,
  useLazyActivateCreditProductOfferQuery,
  useAddCardInsuranceMutation,
  useCancelCardInsuranceMutation,
  useRequestForPinMutation,
} = productsAPI;
