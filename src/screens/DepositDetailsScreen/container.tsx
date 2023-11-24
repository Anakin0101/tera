import React from 'react';
import { useMemo, useState } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Add, Card, Note, Swap } from 'assets/SVGs';
import { DepositTypeEnum } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'hooks/useCopyToClipboard';

export const useDepositDetails = (index: number) => {
  const { t } = useTranslation();
  const { deposits } = useAppSelector(state => state.products);
  const [activeIndex, setActiveIndex] = useState(index);
  const { copyToClipboard } = useCopyToClipboard();

  const deposit = useMemo(() => {
    return deposits[activeIndex];
  }, [activeIndex, deposits]);

  const actions = useMemo(() => {
    if (
      deposit?.typeId === DepositTypeEnum.Saving ||
      deposit?.typeId === DepositTypeEnum.Universal
    ) {
      return [
        {
          title: t('deposits.addMoney'),
          icon: <Add />,
          handlePress: () => {},
        },
        {
          title: t('products.transfer'),
          icon: <Swap />,
          handlePress: () => {},
        },
        {
          title: t('products.payments'),
          icon: <Card />,
          handlePress: () => {},
        },
        {
          title: t('deposits.extraction'),
          icon: <Note />,
          handlePress: () => {},
        },
      ];
    }

    if (deposit?.typeId === DepositTypeEnum.Increasing) {
      return [
        {
          title: t('deposits.addMoney'),
          icon: <Add />,
          handlePress: () => {},
        },
        {
          title: t('deposits.extraction'),
          icon: <Note />,
          handlePress: () => {},
        },
      ];
    }

    return [
      {
        title: t('deposits.extraction'),
        icon: <Note />,
        handlePress: () => {},
      },
    ];
  }, [deposit?.typeId, t]);

  return {
    deposits,
    deposit,
    activeIndex,
    setActiveIndex,
    actions,
    copyToClipboard,
  };
};
