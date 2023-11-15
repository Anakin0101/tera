import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useGetLastTransactionsByAccNumberQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { groupCardsByPan } from 'utils/groupData';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setCards, setLastTransactions } from 'store/slices/products';
import { RelatedOverdraft } from './AccountDetailsScreen.types';

const currentDate = dayjs().toISOString();
const threeMonthsAgo = dayjs().subtract(3, 'month').toISOString();

export const useAccountDetails = (iban: string) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(state =>
    state.products.groupedAccountsByIban.find(acc => acc.iban === iban),
  );
  const { overdrafts } = useAppSelector(state => state.products);

  const { data: lastTransactions } = useGetLastTransactionsByAccNumberQuery(
    {
      count: 4,
      startDate: threeMonthsAgo,
      endDate: currentDate,
      accountNumber: account?.accountNumber,
    },
    { skip: !account },
  );

  const relatedOverdraft = useMemo(() => {
    let result: RelatedOverdraft = null;
    account?.accounts?.forEach(acc => {
      const match = overdrafts?.find(overdraft => acc.accountId === overdraft.accountId);
      if (match) {
        result = match;
      }
    });
    return result;
  }, [account?.accounts, overdrafts]);

  const cardsAttachedToAccount = useMemo(() => {
    return account?.accounts.filter(item => item.cards).flatMap(item => item.cards);
  }, [account?.accounts]);

  const groupedCardsByPan = useMemo(() => {
    return groupCardsByPan(cardsAttachedToAccount, 'pan');
  }, [cardsAttachedToAccount]);

  useEffect(() => {
    dispatch(setCards(groupedCardsByPan));
    dispatch(setLastTransactions(lastTransactions));
  }, [dispatch, groupedCardsByPan, lastTransactions]);

  return {
    account,
    groupedCardsByPan,
    lastTransactions,
    relatedOverdraft,
  };
};
