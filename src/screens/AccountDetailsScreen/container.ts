import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useGetLastTransactionsByAccNumberQuery } from 'services/apis/productsAPI/productsAPI';
import { CardType } from 'services/apis/productsAPI/productsAPI.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { groupCardsByPan } from 'utils/groupData';

const currentDate = dayjs().toISOString();
const threeMonthsAgo = dayjs().subtract(3, 'month').toISOString();

export const useAccountDetails = (iban: string) => {
  const account = useAppSelector(state =>
    state.products.groupedAccountsByIban.find(acc => acc.iban === iban),
  );

  const { data: lastTransactions } = useGetLastTransactionsByAccNumberQuery(
    {
      count: 4,
      startDate: threeMonthsAgo,
      endDate: currentDate,
      accountNumber: account?.accountNumber,
    },
    { skip: !account },
  );

  const cardsAttachedToAccount = useMemo(() => {
    return account?.accounts.filter(item => item.cards).flatMap(item => item.cards);
  }, [account?.accounts]);

  const groupedCardsByPan: CardType[] = groupCardsByPan(cardsAttachedToAccount, 'pan');

  return {
    account,
    groupedCardsByPan,
    lastTransactions,
  };
};
