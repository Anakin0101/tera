import { useAccounts } from 'hooks';
export const useTeraTransfers = () => {
  const { isLoadingAccounts, refetch, transferAccounts } = useAccounts();
  return {
    transferAccounts,
    isLoadingAccounts,
    refetch,
  };
};
