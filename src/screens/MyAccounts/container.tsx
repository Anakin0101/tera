import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';

export const useTeraTransfers = () => {
  const { groupedAccountsByIban, isLoadingAccounts } = useGroupedAccountsByIban();

  return {
    groupedAccountsByIban,
    isLoadingAccounts,
  };
};
