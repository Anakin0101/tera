import { useGroupedAccountsByIban } from 'hooks';

export const useSelectAccountModal = () => {
  const { groupedAccountsByIban, isLoadingAccounts } = useGroupedAccountsByIban();

  return {
    groupedAccountsByIban,
    isLoadingAccounts,
  };
};
