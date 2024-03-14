export type ATMAndBranchItemType = {
  id: string;
  name: string;
  address: string;
  workingHours: string;
  phone: string;
};

export const ATM_AND_BRANCHES_TABS = {
  BRANCHES: 'BRANCHES',
  ATMS: 'ATMS',
};

export type AtmAndBranchTabType = keyof typeof ATM_AND_BRANCHES_TABS;
