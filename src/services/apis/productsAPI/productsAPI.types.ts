export type Currency = 'GEL' | 'USD' | 'EUR' | 'GBP';

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
  status: number;
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

export type LoanType = {
  accountId: number;
  accountNumber: number;
  accruedInterest: number;
  agreementNumber: string;
  amount: number;
  creditId: number;
  creditIsOn: boolean;
  creditPeriodInMonths: number;
  creditStatus: number;
  currency: Currency;
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
