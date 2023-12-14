import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';

export const useTeraTransfers = () => {
  const { groupedAccountsByIban } = useGroupedAccountsByIban();

  return {
    groupedAccountsByIban,
  };
};
