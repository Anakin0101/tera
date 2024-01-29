import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';

export const useTeraTransfers = () => {
  const { groupedAccountsByIban, isLoadingAccounts, refetch } = useGroupedAccountsByIban();

  return {
    groupedAccountsByIban,
    isLoadingAccounts,
    refetch,
  };
};
