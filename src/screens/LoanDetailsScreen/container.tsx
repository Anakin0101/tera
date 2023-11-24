import React from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { List, History } from 'assets/SVGs';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoanDetails = (index: number) => {
  const { loans } = useAppSelector(state => state.products);
  const [activeIndex, setActiveIndex] = useState(index);
  const { t } = useTranslation();

  const loan = useMemo(() => {
    return loans[activeIndex];
  }, [activeIndex, loans]);

  const actions = useMemo(() => {
    return [
      {
        title: t('loans.schedule'),
        icon: <List />,
        handlePress: () => {},
      },
      {
        title: t('loans.history'),
        icon: <History />,
        handlePress: () => {},
      },
    ];
  }, [t]);

  return {
    loans,
    activeIndex,
    setActiveIndex,
    actions,
    loan,
  };
};
