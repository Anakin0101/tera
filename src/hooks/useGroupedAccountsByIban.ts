import { useEffect } from 'react';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccounts, setTotalAvailableBalance } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupAccountsByIban } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { AccountTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

export const useGroupedAccountsByIban = () => {
  const dispatch = useAppDispatch();
  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccountsByCustomerIdQuery(
    undefined,
    { skip: groupAccountsByIban.length > 0 },
  );

  useEffect(() => {
    if (accounts) {
      const accs = accounts.filter(item => item.accountType !== AccountTypeEnum.Deposit) ?? [];

      const groupedAccounts: IGroupedAccountsByIban[] = groupAccountsByIban(accs, 'accountIban');
      const balanceGEL = accs.filter(acc => acc.ccy === 'GEL');
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
