import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { useCallback, useState } from 'react';

export const useFilterTransactionsByAcc = () => {
  const [iban, setIban] = useState('');
  const { groupedAccountsByIban, isLoadingAccounts } = useGroupedAccountsByIban();

  const handlePress = useCallback((accountIban: string) => {
    setIban(prev => (prev !== accountIban ? accountIban : ''));
  }, []);

  return {
    handlePress,
    isLoadingAccounts,
    groupedAccountsByIban,
    iban,
  };
};
