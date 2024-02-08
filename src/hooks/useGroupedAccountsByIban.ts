import { useCallback, useEffect } from 'react';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccounts, setTotalAvailableBalance } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupAccountsByIban } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Account, AccountTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const useGroupedAccountsByIban = () => {
  const dispatch = useAppDispatch();

  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch,
  } = useGetAccountsByCustomerIdQuery(undefined, { skip: false });

  const saveAccounts = useCallback(
    (allAccounts?: Account[]) => {
      try {
        // filter accounts where:
        //  - Only currency is GEL
        //  - accountType must not be deposit
        const accs =
          allAccounts?.filter(
            ({ accountType, ccy }) =>
              accountType !== AccountTypeEnum.Deposit && ccy === CurrencyEnum.GEL,
          ) ?? [];

        const groupedAccounts: IGroupedAccountsByIban[] = groupAccountsByIban(accs, 'accountIban');
        const balanceGEL = accs?.filter(acc => acc?.ccy === CurrencyEnum.GEL);
        const totalAvailableGEL = calculateSum(balanceGEL, 'balance');

        dispatch(setAccounts(groupedAccounts));
        dispatch(setTotalAvailableBalance(totalAvailableGEL));
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
