import { useEffect } from 'react';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccounts, setTotalAvailableBalance } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupAccountsByIban } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useIsFocused } from '@react-navigation/native';

export const useGroupedAccountsByIban = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch,
  } = useGetAccountsByCustomerIdQuery(undefined, { skip: false });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    if (accounts) {
      const groupedAccounts: IGroupedAccountsByIban[] = groupAccountsByIban(
        accounts,
        'accountIban',
      );
      const balanceGEL = accounts.filter(acc => acc.ccy === 'GEL');
      const totalAvailableGEL = calculateSum(balanceGEL, 'balance');

      dispatch(setAccounts(groupedAccounts));
      dispatch(setTotalAvailableBalance(totalAvailableGEL));
    }
  }, [accounts, dispatch]);

  return {
    isLoadingAccounts,
    groupedAccountsByIban,
  };
};
