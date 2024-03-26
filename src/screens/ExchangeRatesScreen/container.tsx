import React from 'react';
import { useCallback, useMemo } from 'react';
import { useGetRatesQuery } from 'services/apis';
import { groupRates } from 'utils/groupData';
import { closeModal, openModal } from 'utils/modal';
import { ExchangeRateCalculatorModal } from 'components/modals';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { MY_ACCOUNTS_SCREEN } from 'navigation/ScreenNames';

export const useExchangeRates = () => {
  const { navigate } = useNavigation<ModalStackScreenProps<'MyAccountsScreen'>>();
  const { data: rates, isLoading: isRatesLoading } = useGetRatesQuery();

  const groupedRates = useMemo(() => {
    return groupRates(rates);
  }, [rates]);

  const currencies = useMemo(() => {
    if (groupedRates) {
      const data = groupedRates?.map(rate => rate?.currency);
      return [CurrencyEnum.GEL, ...data];
    }
    return [];
  }, [groupedRates]);

  const handleConversion = useCallback(() => {
    closeModal();
    navigate(MY_ACCOUNTS_SCREEN, {});
  }, [navigate]);

  const handlePress = useCallback(() => {
    openModal({
      element: (
        <ExchangeRateCalculatorModal currencies={currencies} handleConversion={handleConversion} />
      ),
      title: 'exchange.convert',
      withKeyboard: true,
      disablePanning: true,
      disableDynamicSizing: true,
      snapPoints: ['90%'],
    });
  }, [currencies, handleConversion]);

  return {
    rates,
    isRatesLoading,
    groupedRates,
    handlePress,
  };
};
