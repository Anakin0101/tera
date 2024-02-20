import { CurrencyEnum } from '../transfersAPI/transfersAPI.types';

export type Currency = 'GEL' | 'USD' | 'EUR' | 'GBP';

export enum CardStatusCode {
  Issued = 6,
  Blocked = 9,
  TemporarilyInactive = 13,
}

export type CardType = {
  accountNumber: number;
  cardHolder: string;
  cardImageId: number;
  cardImageUrl: string;
  cardLargeImageId: string;
  cardProductName: string;
  cardSmallImageId: string;
  endDate: string;
  id: number;
  isCreditCard: boolean;
  isInsured: boolean;
  pan: string;
  priority: number;
  startDate: string;
  status: CardStatusCode;
};

export type Account = {
  accountId: number;
  accountIban: string;
  accountType: AccountTypeEnum;
  accountNumber: number;
  ccy: CurrencyEnum;
  accountName: string;
  accountNameLat: string;
  accountNameCustom: null | string;
  accountStatusId: number;
  isDebit: boolean;
  isCredit: boolean;
  isFavourite: boolean;
  blockedAmount: number;
  availableBalance: number;
  balance: number;
  positionIndex: number;
  cards: CardType[];
};

type OfferImageType = {
  url: string;
  type: number;
};

export type OfferType = {
  id: number;
  type: OfferTypeEnum;
  lmsApplicationId: number;
  creditDisbursementId: number;
  hasClientOffer: boolean;
  title: string;
  description: string;
  images: OfferImageType[];
  cardProducts?: CardProduct[];
};

export type CardProduct = {
  cardId: number | null;
  canUpdate: boolean;
  cardProductId: number;
  name: string;
  serviceFee: string;
  cardQuickPrintEnabled: boolean;
  validityPeriodYears: number;
  endDate: string;
  cardImageUrl: string;
  cardKind: string;
  cardHolderName: string;
  cardProcessingConditions: CardProcessingCondition[];
  productServiceConditions: ProductServiceCondition[];
  productUpdateServiceConditions: Record<string, ProductServiceCondition[]>;
};

export type CardProcessingCondition = {
  id: string;
  title: string;
  value: string;
};

export type ProductServiceCondition = {
  id: string;
  title: string;
  value: string;
};

export type OffersAPIResponseType = {
  offers: OfferType[];
};

export type DepositType = {
  accountId: number;
  accountNumber: number;
  agreementNumber: string;
  amount: number;
  canCredit: boolean;
  canDebit: boolean;
  currency: CurrencyEnum;
  depositId: number;
  depositName: string;
  depositNameEng: string;
  depositType: string;
  depositTypeEng: string;
  endDate: string;
  iban: string;
  interestPercent: number;
  isCD: boolean;
  nominalAmount: number;
  period: number;
  productId: number;
  startDate: string;
  totalAccrualPercent: number;
  totalCapitalizedPercent: number;
  totalInterest: number;
  typeId: number;
};

export type TransactionType = {
  docDate: string;
  description: string;
  balanceStart: number;
  balance: number;
  amount: number;
  isIncome: boolean;
  senderIban: string;
  currency: CurrencyEnum;
  rowN: number;
  id: number;
  docNumber: number;
  docDateInDoc: string;
  opCode: string;
  extraDescription: string;
  recState: number;
  docType: number;
  debitAccountId: number;
  creditAccountId: number;
  senderBankCode: string;
  senderBankName: string;
  senderPid: string;
  senderName: string;
  receiverBankCode: string;
  receiverBankName: string;
  receiverPid: string;
  receiverIban: string;
  receiverName: string;
  intermedBankCode: string;
  intermedBankName: string;
  taxPayerTaxCode: string;
  taxPayerName: string;
  currencyBuy: CurrencyEnum;
  amountBuy: number;
  currencySell: CurrencyEnum;
  amountSell: number;
  rateItems: number;
  rateAmount: number;
  rateReverse: boolean;
  opType: number;
  extraInfo: any;
  isCommission: boolean;
  isTask: boolean;
  taskState: number;
  taskError: string;
};

export type LastTransactionReq = {
  count: number;
  accountNumber?: number;
  startDate: string;
  endDate: string;
};

export type LastTransactionRes = {
  ops: TransactionType[];
};

export type UpdateAccountNameReq = {
  userId: number;
  customerId: number;
  channelId: number;
  culture: string;
  accountId: number;
  accountName: string;
};

export type LoanSchedule = {
  nextPaymentDay: string;
  principal: number;
  interest: number;
  balance: number;
  totalDebt: number;
  insurance: number;
};

export type LoanHistory = {
  loanId: number;
  date: string;
  paymentDate: string;
  principal: number;
  interest: number;
  penalty: number;
  fee: number;
  total: number;
};

export enum OfferTypeEnum {
  Deposit = 1,
  Loan = 2,
  CardInsurance = 3,
  CreditDisbursement = 4,
  Card = 5,
  Package = 6,
  OpenBanking = 7,
  NewCard = 31,
}

type OfferName = {
  en: string;
  ka: string;
};

type OfferCurrencies = {
  currency: CurrencyEnum;
  minAmount: number;
  maxAmount: number;
};

type DepositProduct = {
  productId: number;
  name: OfferName;
  minPeriod: number;
  maxPeriod: number;
  currencies: OfferCurrencies[];
  hasAccrualAccount: boolean;
  isCd: boolean;
};

export type OfferDetails = {
  id: number;
  type: OfferTypeEnum;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  depositProducts: DepositProduct[];
  cardProducts: CardProduct[];
};

export type InterestRatesReq = {
  amount: number;
  productId: number | null;
  creditAccountId: number;
  debitAccountId: number;
  currency: Currency;
};

export type InterestRate = {
  percent: number;
  effectivePercent: number;
  periodInMonths: number;
  percentRate: number;
  clientOffer: number;
};

export type InterestRatesRes = {
  interestRates: InterestRate[];
};

export type CalculateDeposit = {
  periodInMonths?: number;
} & InterestRatesReq;

export type CalculateDepositRes = {
  benefit: number;
};

export type RegisterDepositReq = Omit<CalculateDeposit, 'currency'>;

export type RegisterDepositRes = {
  registrationId: string;
  agreementId: string;
  cdRegistryId: string;
  depositId: number;
  bpId: number;
  agreementPdf: string;
  cdRegistryPdf: string;
};

export enum AccountTypeEnum {
  Current = 100,
  Card = 200,
  Deposit = 32,
}

export type ActivateDepositReq = {
  sendOtp?: boolean;
  otp?: string;
  registrationId?: string;
  depositId?: number;
  fileId?: string;
  cdFileId?: string;
  productType?: string;
  bpId?: number;
};

export type WalletAmount = {
  key: number;
  value: string;
};

export type WalletAccount = {
  accountId: number;
  iban: string;
  currency: CurrencyEnum;
  nameEng: string;
  nameGeo: string;
  typeGeo: string;
  typeEng: string;
};

export type TeraWalletRes = {
  ccy: Currency[];
  amount: WalletAmount[];
  account: WalletAccount[];
  canCreateTeraWallet: boolean;
};

export type TeraWalletPDFReq = {
  amountId: number;
  accountId: number;
};

export type AddOrUpdateTeraWalletReq = {
  culture?: string;
  ccy?: Currency;
  amountId?: number;
  accountId?: number;
  teraWalletId?: number;
  disableWallet?: boolean;
  fileId?: string;
  sendOtp?: boolean;
  otp?: string;
};

export type LoanProduct = {
  name: string;
  currencyForWhichIsConfigured: CurrencyEnum;
  lmsId: number;
  minAmount: number;
  maxAmount: number;
  currencies: CurrencyEnum[];
  period: {
    min: number;
    max: number;
  };
};

export type LmsProduct = {
  displayName: string;
  productsGroupId: number;
  products: LoanProduct[];
};

export type LoanConfigRes = {
  lmsProducts: LmsProduct[];
  maxPaymentDayAfterRequested: number;
  minPaymentDayAfterRequested: number;
};

export type RequestForLoanReq = {
  amount: number;
  monthlyNetIncome: number;
  interval: number;
  productsGroupId: number;
  currency: CurrencyEnum;
  employerName: string;
  position: string;
  allowToCheckCreditInfo: boolean;
  allowToCheckRevenue: boolean;
  allowToCheckMessageInfo: boolean;
  paymentDate: string;
  incomeType: number;
  sendOtp: boolean;
  otp: string;
};

export type RequestForLoanConsentTexts = {
  consentTodataProcessing: string;
  consentToDataProcessingInCreditInfo: string;
  consentToMessageDataProcessingInfo: string;
};

export enum AutoPaymentTypeEnum {
  ByDebt = 0,
  FixedDateByDebt = 1,
  FixedAmount = 2,
}
interface BranchName {
  Geo: string;
  Eng: string;
}

export interface Branch {
  id: number;
  name: BranchName;
}

export interface BranchesResponse {
  branches: Branch[];
}

export interface AddCardRequest {
  accountId: string | undefined;
  cardId: null;
  culture: string;
  departmentId: number | undefined;
  isUrgent: boolean;
  otp: string;
  productId: number | null | undefined;
  sendOtp: boolean;
  timezoneOffset: number;
  updateReason: number;
}
