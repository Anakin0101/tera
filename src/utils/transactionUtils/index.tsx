import { createBudgetEnum } from 'components/modals/CreateCodeModal/CreateModal.types';

export const transactionTitles = {
  fromMobile: 'transactions.fromMobile',
  defaultTitle: 'transactions.defaultTitle',
};

export const PERSONAL_TRANSACTION = 'transactions.defaultTitle';

export const budgetReceiverUser = [
  { id: 1, name: 'transactions.forMe' },
  { id: 2, name: 'transactions.forOthers' },
];

export enum budgeTenum {
  FOR_ME = 1,
  FOR_OTHERS = 2,
}

export const getTextForIndex = (activeIndex: createBudgetEnum): string => {
  switch (activeIndex) {
    case createBudgetEnum.FIRST_VIEW:
      return 'transactions.chooseReceiver';
    case createBudgetEnum.SECOND_VIEW:
      return 'transactions.chooseCity';
    case createBudgetEnum.THIRD_VIEW:
      return 'transactions.choosePayment';
    default:
      return 'transactions.chooseReceiver';
  }
};

export const sectionKeys = [
  'conversion',
  'p2pTransfers',
  'bankExternal',
  'mobilePayment',
  'bankInternal',
  'budget',
  'internal',
];
export const trustedTransactions = ['bankExternal', 'bankInternal', 'budget'];
