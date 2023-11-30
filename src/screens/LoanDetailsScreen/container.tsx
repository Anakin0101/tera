import React, { useCallback } from 'react';
import { useMemo, useState } from 'react';
import { List, History, CreditCard, Note, Swap } from 'assets/SVGs';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { openModal } from 'utils/modal';
import { config } from 'utils/config';
import { useDefaultHeaderHeight } from 'hooks/useDefaultHeaderHeight';
import { LoanScheduleModal } from 'components/modals';

export const useLoanDetails = (index: number) => {
  const { headerHeight } = useDefaultHeaderHeight();
  const { loans, overdrafts, creditCards } = useAppSelector(state => state.products);
  const [activeIndex, setActiveIndex] = useState(index);

  const data = useMemo(() => {
    return [...overdrafts, ...creditCards, ...loans];
  }, [creditCards, loans, overdrafts]);

  const loan = useMemo(() => {
    return data[activeIndex];
  }, [activeIndex, data]);

  const onSchedulePress = useCallback(() => {
    if ('creditId' in loan) {
      openModal({
        element: <LoanScheduleModal creditId={loan.creditId} />,
        title: 'loans.schedule',
        hideHandle: true,
        disableDynamicSizing: true,
        snapPoints: [config.mobileHeight - headerHeight],
      });
    }
  }, [headerHeight, loan]);

  const actions = useMemo(() => {
    if ('creditLimit' in loan) {
      return [
        {
          title: 'loans.cover',
          icon: <List />,
          handlePress: () => {},
        },
        {
          title: 'products.requisite',
          icon: <Note />,
          handlePress: () => {},
        },
        {
          title: 'products.pay',
          icon: <CreditCard />,
          handlePress: () => {},
        },
        {
          title: 'loans.operations',
          icon: <List />,
          handlePress: () => {},
        },
      ];
    }

    if ('overdraftLimit' in loan) {
      return [
        {
          title: 'products.transfer',
          icon: <Swap />,
          handlePress: () => {},
        },
        {
          title: 'products.pay',
          icon: <CreditCard />,
          handlePress: () => {},
        },
        {
          title: 'loans.operations',
          icon: <Note />,
          handlePress: () => {},
        },
      ];
    }

    return [
      {
        title: 'loans.schedule',
        icon: <List />,
        handlePress: onSchedulePress,
      },
      {
        title: 'loans.history',
        icon: <History />,
        handlePress: () => {},
      },
    ];
  }, [loan, onSchedulePress]);

  return {
    loans,
    activeIndex,
    setActiveIndex,
    actions,
    loan,
    data,
  };
};
