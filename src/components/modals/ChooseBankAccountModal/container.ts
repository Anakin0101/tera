import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';

export const useChooseBankAccount = () => {
  const { groupedAccountsByIban, isLoadingAccounts } = useGroupedAccountsByIban();

  return {
    groupedAccountsByIban,
    isLoading: isLoadingAccounts,
  };
};
