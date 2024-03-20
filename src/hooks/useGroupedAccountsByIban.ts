import { useCallback, useEffect } from 'react';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccounts } from 'store/slices/products';
import { groupAccountsByIban } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Account, AccountTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

export const useGroupedAccountsByIban = () => {
  const dispatch = useAppDispatch();
  const { groupedAccountsByIban } = useAppSelector(state => state.products);

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch,
  } = useGetAccountsByCustomerIdQuery();

  const saveAccounts = useCallback(
    (allAccounts?: Account[]) => {
      try {
        if (!allAccounts) return;

        const accs =
          allAccounts?.filter(({ accountType }) => accountType !== AccountTypeEnum.Deposit) ?? [];

        const groupedAccounts: IGroupedAccountsByIban[] = groupAccountsByIban(accs, 'accountIban');
        dispatch(setAccounts(groupedAccounts));
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
    groupedAccountsByIban,
    refetch,
  };
};
