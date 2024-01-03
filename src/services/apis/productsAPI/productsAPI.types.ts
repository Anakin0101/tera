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
  cardLargeImageUrl: string;
  cardProductName: string;
  cardSmallImageUrl: string;
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
  accountType: number;
  accountNumber: number;
  ccy: Currency;
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

type ImageType = {
  url: string;
  type: number;
};

export type OfferType = {
  id: number;
  type: number;
  lmsApplicationId: unknown;
  creditDisbursementId: unknown;
  hasClientOffer: boolean;
  title: string;
  description: string;
  images: ImageType[];
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
  currency: Currency;
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
  currency: Currency;
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
  currencyBuy: Currency;
  amountBuy: number;
  currencySell: Currency;
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
