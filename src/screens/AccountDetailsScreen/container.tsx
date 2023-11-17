import React from 'react';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useGetLastTransactionsByAccNumberQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { groupCardsByPan } from 'utils/groupData';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setCards, setLastTransactions } from 'store/slices/products';
import { RelatedOverdraft } from './AccountDetailsScreen.types';
import { Card, Note, Share, Swap } from 'assets/SVGs';
import { openModal } from 'utils/modal';
import { RequisitesModal } from 'components/modals/RequisitesModal/RequisitesModal';

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

  const sliderData = useMemo(() => {
    if (!account) {
      return [];
    }

    if (!groupedCardsByPan.length) {
      return [{ accounts: account?.accounts }];
    }

    return groupedCardsByPan.map(card => ({
      card,
      accounts: account?.accounts,
    }));
  }, [account, groupedCardsByPan]);

  useEffect(() => {
    dispatch(setCards(groupedCardsByPan));
    dispatch(setLastTransactions(lastTransactions));
  }, [dispatch, groupedCardsByPan, lastTransactions]);

  const handleRequisites = () => {
    openModal({
      element: <RequisitesModal />,
      title: 'products.chooseLanguage',
      titlePosition: 'center',
      disablePanning: true,
    });
  };

  const actions = useMemo(() => {
    return [
      {
        title: 'products.transfer',
        icon: <Swap />,
        handlePress: () => {},
      },
      {
        title: 'products.payments',
        icon: <Card />,
        handlePress: () => {},
      },
      {
        title: 'products.requisite',
        icon: <Note />,
        handlePress: handleRequisites,
      },
      {
        title: 'products.share',
        icon: <Share />,
        handlePress: () => {},
      },
    ];
  }, []);

  return {
    account,
    groupedCardsByPan,
    lastTransactions,
    relatedOverdraft,
    sliderData,
    actions,
  };
};
