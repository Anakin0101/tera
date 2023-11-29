import { useAppSelector } from 'store/hooks/useAppSelector';

import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useEffect } from 'react';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccounts, setTotalAvailableBalance } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupAccountsByIban } from 'utils/groupData';

export const useTeraTransfers = () => {
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector(state => state.profile);
  const { data: accounts } = useGetAccountsByCustomerIdQuery(customerId ?? skipToken);
  const { groupedAccountsByIban } = useAppSelector(state => state.products);
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
    groupedAccountsByIban,
  };
};
