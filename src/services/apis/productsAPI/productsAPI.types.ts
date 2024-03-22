import { CurrencyEnum } from '../transfersAPI/transfersAPI.types';

export type BilingualText = {
  en: string;
  ka: string;
};

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

export enum OpCategoryEnum {
  Income = 1,
  ToSomeone = 2,
  ToOwnAccount = 3,
  Exchange = 4,
  ToTreasure = 5,
  Payments = 6,
}

export type CustomerOperationsReq = {
  count: number;
  culture?: string;
  currency?: CurrencyEnum;
  endDate: string;
  startDate: string;
  accountNumber?: number;
  opCategory?: OpCategoryEnum;
  searchWords?: string;
  splitOps?: boolean;
};

export type CustomerOperationsRes = {
  ops: TransactionType[];
};

export type CreditCardType = {
  creditId: number;
  accountId: number;
  accountNumber: number;
  agreementNumber: string;
  currency: CurrencyEnum;
  creditLimit: number;
  interestRate: number;
  creditStartDate: string;
  creditEndDate: string;
  billingDay: number;
  creditStatus: CreditStatus;
  creditIsOn: true;
  usedPrincipalAmount: number;
  notUsedPrincipalAmount: number;
  accruedInterest: number;
  interestFreeCreditPayable: number;
  minPayable: number;
  minPrincipalPayable: number;
  minInterestPayable: number;
  paymentEndDate: string;
  totalPenalty: number;
  overduePrincipalAmount: number;
  overduePrincipalPenalty: number;
  overdueInterestAmount: number;
  overdueInterestPenalty: number;
  canShowAgreement: false;
  creditPeriodInMonths: number;
  restCreditPeriodInMonths: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  productName: string;
};

export enum CreditStatus {
  Current = 60,
  Late = 70,
  Overdue = 80,
  WrittenOff = 90,
  Closed = 255,
}

export type OverdraftType = {
  id: number;
  accountId: number;
  accountIban: string;
  productName: string;
  agreementNumber: string;
  interestRate: number;
  startDate: string;
  endDate: string;
  overdraftLimit: number;
  currency: CurrencyEnum;
  totalDebt: number;
  totalInterest: number;
  usedPrincipalAmount: number;
  creditPeriodInMonths: number;
  restCreditPeriodInMonths: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  status: CreditStatus;
};

export type LoanType = {
  accountId: number;
  accountNumber: number;
  accruedInterest: number;
  agreementNumber: string;
  amount: number;
  creditId: number;
  creditIsOn: boolean;
  creditPeriodInMonths: number;
  creditStatus: CreditStatus;
  currency: CurrencyEnum;
  defferdInterestAmount: number;
  defferdPrincipalAmount: number;
  endDate: string;
  hasInsurance: true;
  hasSubsidizedInterest: boolean;
  interestRate: number;
  nextPaymentAmount: number;
  nextPaymentDate: string;
  nextPaymentsCount: number;
  notUsedPrincipalAmount: number;
  overdueInterestAmount: number;
  overdueInterestPenalty: number;
  overduePrincipalAmount: number;
  overduePrincipalPenalty: number;
  productName: string;
  restCreditPeriodInMonths: number;
  startDate: string;
  totalDebt: number;
  totalInterestPayable: number;
  totalOverduePayable: number;
  totalPayable: number;
  totalPenalty: number;
  totalPrincipalPayable: number;
  usedPrincipalAmount: number;
};

export enum DepositTypeEnum {
  Increasing = 5,
  Universal = 10,
  Saving = 11,
}

export type Deposit = {
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
  typeId: DepositTypeEnum;
};

export type LoanSchedule = {
  nextPaymentDay: string;
  principal: number;
  interest: number;
  balance: number;
  totalDebt: number;
  insurance: number;
  id: number;
  insuranceTotal: number;
  subsidizedInterest: number;
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
  id: number;
  lifeInsurance: number;
  subsidizedInterest: number;
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

type OfferCurrencies = {
  currency: CurrencyEnum;
  minAmount: number;
  maxAmount: number;
};

type DepositProduct = {
  productId: number;
  name: BilingualText;
  minPeriod: number;
  maxPeriod: number;
  currencies: OfferCurrencies[];
  hasAccrualAccount: boolean;
  isCd: boolean;
};

export enum PackageServiceCode {
  Monthly = 'PackageServiceMonthly',
  Yearly = 'PackageServiceYearly',
}

export enum PackageServiceNames {
  classic = 'Classic Package',
  gold = 'Gold Package',
  platinum = 'Platinum Package',
}

export type PackageService = {
  id: string;
  name: string;
  code: string;
  price: number;
  currency: string;
};

export type PackageProducts = {
  code?: string;
  name: PackageServiceNames;
  nameEng?: string;
  productPrice: string;
  productPriceENG?: string;
  standardPriceMonthly?: string;
  standardPriceMonthlyEng?: string;
  standardPriceYearly?: string;
  standardPriceYearlyEng?: string;
  status?: number;
};

export type CustomerPackages = {
  id: string;
  isActive: boolean;
  name: PackageServiceNames;
  nameEng: string;
  packageProducts: PackageProducts[];
  packageServiceId: string;
  packageServices: PackageService[];
  pending: boolean;
  status: string;
};

export type CardInsuranceProducts = {
  insuranceTypeId: number;
  tariffProductId: string;
  nameKa: string;
  nameEn: string;
  serviceFee: number;
  serviceFeeCurrency: CurrencyEnum;
  serviceFeeScheduleId: number;
  serviceFeeScheduleServiceId: string;
  isActive: boolean;
  chipTransactions: number;
  internetTransactions: number;
  unauthTransactions: number;
  order: number;
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
  customerPackages?: CustomerPackages[];
  cardInsuranceProducts?: CardInsuranceProducts[];
};

export type InterestRatesReq = {
  amount: number;
  productId: number | null;
  creditAccountId: number;
  debitAccountId: number;
  currency: CurrencyEnum;
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

export type RegisterDepositReq = {
  culture: string;
  productId: number;
  debitAccountId: number;
  creditAccountId: number;
  amount: number;
  periodInMonths?: number;
};

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
  ccy: CurrencyEnum[];
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
  ccy?: CurrencyEnum;
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
type BranchName = {
  Geo: string;
  Eng: string;
};

export type Branch = {
  id: number;
  name: BranchName;
};

export type BranchesResponse = {
  branches: Branch[];
};

export type AtmsResponse = {
  id: number;
  addresGeo: string;
  addresEng: string;
  descriptionGeo: string;
  descriptionEng: string;
  latitude: number;
  longitude: number;
  isExternal: false;
  isActive: true;
  distance: number;
};

export type AddCardRequest = {
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
};
export type ActivatePackage = {
  packageId?: string;
  packageServiceId?: string;
  otp?: string;
  sendOtp?: boolean;
  culture?: string;
  timezoneOffset?: number;
};

export enum FileFormatEnum {
  Excel = 1,
  Pdf = 2,
}

export type PrintLoanSchedulesReq = {
  culture: string;
  loanId: number;
  fileFormat: FileFormatEnum;
};

export type PrintLoanSchedulesRes = {
  fileId: string;
};

export type TerabytesRes = {
  teraBytes: number;
  teraBytesInGel: number;
};
export type DepositByIdReq = {
  culture: string;
  depositId?: number;
};

export type CancelationCondition = {
  description: string;
  value: string;
};

export type DepositByIdRes = {
  additional: {
    additionalText: string[];
    currency: CurrencyEnum;
    maturityDate: string;
    maturityDateText: string;
    minimalAccrualAmount: number;
    minimalAccrualAmountText: string;
    monthlyMinTranshAmount: number;
    monthlyMinTranshAmountText: string;
    openAmount: number;
    openAmountText: string;
    percentEnrolmentPeriod: string;
    percentType: string;
    startDateText: string;
  };
  cancelationConditions: {
    conditions: CancelationCondition[];
  };
  depositNumber: string;
  financialData: {
    openFee: number;
    openFeeText: string;
    percentWithdrawalFee: number;
    percentWithdrawalFeeText: string;
    serviceFee: number;
    serviceFeeText: string;
    withdrawalFee: number;
    withdrawalFeeText: string;
  };
  headLine: {
    name: string;
    productName: string;
  };
  isCD: boolean;
  percentData: {
    efectPercentText: string;
    efectPercentValText: string;
    percentByCurrency: any[];
    percentScaleDatas: any;
    percentText: string;
  };
};

export type CreditDisbursementReq = {
  creditDisbursementId: number;
  culture: string;
};
export type PrintAccountRequisites = {
  culture: string;
  accountId: number;
};

export interface PrintAccountRequisitesRes {
  fileId: string;
}

export type GetStatementReq = {
  culture: string;
  accountNumber: number;
  currency: string;
  startDate: string;
  endDate: string;
  fileFormat: FileFormatEnum;
  otp: string;
  isTeraWallet: boolean;
};
type RefinancingPurpose = {
  amount: number;
  nameEng: string;
  name: string;
  code: string;
};

export type CreditDisbursementRes = {
  amount: number;
  interest: number;
  effectiveRate: number;
  monthlyPayment: number;
  lifeInsurance: number;
  disbursementFee: number;
  currency: CurrencyEnum;
  endDate: string;
  offerValidityStartTime: string;
  offerValidityEndTime: string;
  prepaymentConditions: BilingualText;
  creditDeliveryConditions: BilingualText;
  additionalConditions: BilingualText;
  coveragePeriod: BilingualText;
  hasSchedule: boolean;
  hasOverdraft: boolean;
  branchName: string;
  creditOfficerName: string;
  creditOfficerLastName: string;
  creditOfficerMobile: string;
  additionalExpencies: [];
  refinancingPurposes: RefinancingPurpose[];
};

export type CreditProductOfferAgreementRes = {
  fileId: string;
  success: boolean;
  error: boolean;
  pending: boolean;
  channelData: any;
};

export type CreditProductOfferSchedule = {
  culture: string;
  id: number;
};

export type ActivateCreditProductOfferReq = {
  id?: number;
  sendOtp?: boolean;
  otp?: string;
  culture?: string;
};

export enum ExchangeRateTypeEnum {
  Special = 1,
  Standard = 2,
  Official = 3,
}

export type ExchangeRate = {
  currency: CurrencyEnum;
  amountBuy: number;
  amountSell: number;
  items: number;
  type: ExchangeRateTypeEnum;
};

export type OfferByIdReq = {
  culture: string;
  offerId?: number;
  cardId?: number;
};

export type CardInsuranceReq = {
  culture: string;
  cardId: number;
  insuranceTypeId: number;
  anyData: string;
  sendOtp: boolean;
  otp: string;
};

export type CancelCardInsuranceReq = {
  culture: string;
  cardId: number;
  approvalCode: string;
  anyData: string;
};

export type RequestForPin = {
  culture: string;
  cardId: number;
  generateNewPin: boolean;
  sendOtp: boolean;
  otp: string;
};

export type UnblockCardReq = {
  culture: string;
  cardId: number;
  sendOtp: boolean;
  otp: string;
};

export type UpdateAccountNameReq = {
  accountId: number;
  accountName: string;
  culture: string;
};

export type FavouriteReq = {
  accountId: number;
  culture: string;
};

export type UserBalance = {
  currency: CurrencyEnum;
  amount: number;
};

export type GroupedUserBalanceRes = {
  userBalance: UserBalance[];
};

export type BlockedTransactionType = {
  accountId: number;
  time: string;
  cardPan: unknown;
  amount: number;
  owner: string;
  address: string | null;
  city: string | null;
};

export type BlockedTransactionsApiResponseType = {
  accountBlocks: BlockedTransactionType[];
};

export type BlockedTransactionExtendedType = BlockedTransactionType & {
  id: number;
  description: string;
  docDate: string;
  currency: CurrencyEnum;
  isIncome: boolean;
};
