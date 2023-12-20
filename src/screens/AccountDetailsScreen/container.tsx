import React, { useEffect, useState, useMemo } from 'react';
import { openModal } from 'utils/modal';
import { groupCardsByPan } from 'utils/groupData';
import { Card, Note, Share, Swap } from 'assets/SVGs';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { RelatedOverdraft } from './AccountDetailsScreen.types';
import { setCards, setLastTransactions } from 'store/slices/products';
import { RequisitesModal } from 'components/modals/RequisitesModal/RequisitesModal';
import { useGetLastTransactionsByAccNumberMutation } from 'services/apis/productsAPI/productsAPI';
import { RequestStatusModal } from 'components/modals/RequestStatusModal/RequestStatusModal';
import { getCurrentDateISO, getDateThreeMonthAgeISO } from 'utils/formatDate';

export const useAccountDetails = (iban: string, index: number) => {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(index);
  const { groupedAccountsByIban, overdrafts } = useAppSelector(state => state.products);

  const account = useMemo(() => {
    return groupedAccountsByIban[activeIndex];
  }, [groupedAccountsByIban, activeIndex]);

  const [getLastTransactions, { data: lastTransactions }] =
    useGetLastTransactionsByAccNumberMutation();

  useEffect(() => {
    if (account) {
      getLastTransactions({
        count: 4,
        startDate: getDateThreeMonthAgeISO(),
        endDate: getCurrentDateISO(),
        accountNumber: account?.accountNumber,
      });
    }
  }, [account, getLastTransactions]);

  const blockedAmounts = useMemo(() => {
    return account?.accounts
      .filter(item => item.blockedAmount)
      .map(({ blockedAmount, ccy }) => ({
        blockedAmount,
        ccy,
      }));
  }, [account?.accounts]);

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

  const overdraftRelatedToAcc = useMemo(() => {
    let result: RelatedOverdraft = null;
    account?.accounts?.forEach(item => {
      const match = overdrafts?.find(overdraft => item.accountId === overdraft.accountId);
      if (match) {
        result = match;
      }
    });
    return result;
  }, [account?.accounts, overdrafts]);

  const handleRequisites = () => {
    openModal({
      element: <RequisitesModal />,
      title: 'products.chooseLanguage',
      titlePosition: 'center',
      disablePanning: true,
    });
  };
  const handlePayments = () => {
    openModal({
      element: <RequestStatusModal success message="პინ კოდს მიიღებთ SMS სახით" />,
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
        handlePress: handlePayments,
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
    groupedAccountsByIban,
    actions,
    overdraftRelatedToAcc,
    groupedCardsByPan,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    setActiveIndex,
  };
};
