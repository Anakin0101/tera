import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { useState } from 'react';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export const useFilterTransactionsByAcc = () => {
  const [iban, setIban] = useState('');
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [modalTitle, setModalTitle] = useState('transactions.account');
  const { groupedAccountsByIban, isLoadingAccounts } = useGroupedAccountsByIban();
  const [accountSelected, setAccountSelected] = useState(false);

  const onClearPress = () => {
    accountSelected ? setCurrency(null) : setIban('');
  };

  const onSelectAccountPress = () => {
    if (!iban) {
      return;
    }
    setModalTitle('common.currency');
    setAccountSelected(true);
  };

  return {
    isLoadingAccounts,
    groupedAccountsByIban,
    iban,
    currency,
    setCurrency,
    accountSelected,
    onSelectAccountPress,
    modalTitle,
    setIban,
    onClearPress,
  };
};
