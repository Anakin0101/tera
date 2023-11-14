import { CardType } from 'services/apis/productsAPI/productsAPI.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { groupedDataByKey } from 'utils/groupDataByKey';

export const useAccountDetails = (iban: string) => {
  const account = useAppSelector(state =>
    state.products.groupedAccountsByIban.find(acc => acc.iban === iban),
  );

  const cardsAttachedToAccount = account?.accounts
    .filter(item => item.cards)
    .flatMap(item => item.cards);

  const groupedCardsByPan: CardType[] = groupedDataByKey(cardsAttachedToAccount, 'pan');

  return {
    account,
    groupedCardsByPan,
  };
};
