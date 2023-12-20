import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { useState } from 'react';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export const useFilterTransactionsByAcc = () => {
  const [accountNumber, setAccountNumber] = useState<number | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [modalTitle, setModalTitle] = useState('transactions.account');
  const { groupedAccountsByIban, isLoadingAccounts } = useGroupedAccountsByIban();
  const [accountSelected, setAccountSelected] = useState(false);

  const onClearPress = () => {
    accountSelected ? setCurrency(null) : setAccountNumber(null);
  };

  const onSelectAccountPress = () => {
    if (!accountNumber) {
      return;
    }
    setModalTitle('common.currency');
    setAccountSelected(true);
  };

  return {
    isLoadingAccounts,
    groupedAccountsByIban,
    accountNumber,
    currency,
    setCurrency,
    accountSelected,
    onSelectAccountPress,
    modalTitle,
    setAccountNumber,
    onClearPress,
  };
};
