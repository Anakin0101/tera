import { useCallback, useEffect } from 'react';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setTransferAccounts } from 'store/slices/products';
import { groupAccountsByIban } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Account } from 'services/apis/productsAPI/productsAPI.types';

export const useAccounts = () => {
  const dispatch = useAppDispatch();

  const { transferAccounts } = useAppSelector(state => state.products);
  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch,
  } = useGetAccountsByCustomerIdQuery(undefined, { skip: false });

  const saveAccounts = useCallback(
    (allAccounts?: Account[]) => {
      try {
        const accs = allAccounts?.filter(({ isDebit }) => isDebit) ?? [];

        const groupedAccounts: IGroupedAccountsByIban[] = groupAccountsByIban(accs, 'accountIban');
        dispatch(setTransferAccounts(groupedAccounts));
      } catch (err) {
        console.warn('Error in useGroupedAccountsByIban hook: saveAccounts', err);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    saveAccounts(accounts);
  }, [accounts, saveAccounts]);

  return {
    isLoadingAccounts,
    transferAccounts,
    refetch,
  };
};
