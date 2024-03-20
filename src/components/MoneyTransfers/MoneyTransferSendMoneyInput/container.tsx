import React, { useCallback } from 'react';
import { SelectCurrencyModal } from 'components/modals';
import { Keyboard } from 'react-native';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { closeModal, openModal } from 'utils/modal';

export const useMoneyTransferSendMoney = (
  selectedSendCurrency: CurrencyEnum,
  setSelectedSendCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>,
) => {
  const selectCurrencyOnPress = useCallback(() => {
    Keyboard.dismiss();
    openModal({
      element: (
        <SelectCurrencyModal
          selectedCurrency={selectedSendCurrency}
          setSelectedCurrency={(val: CurrencyEnum) => {
            setSelectedSendCurrency(val);
            closeModal();
          }}
        />
      ),
      snapPoints: ['80%'],
    });
  }, [selectedSendCurrency, setSelectedSendCurrency]);

  return { selectCurrencyOnPress };
};
