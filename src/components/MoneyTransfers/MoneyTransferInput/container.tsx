import React from 'react';
import { openModal } from 'utils/modal';
import { Keyboard } from 'react-native';
import { SelectTransferFieldModal } from 'components/modals';
import { PaymentAddressFieldItem } from 'components/modals/SelectTransferFieldModal/SelectTransferFieldModal.types';

export const useMoneyTransferDropDown = (
  name: string,
  fieldItems: Array<PaymentAddressFieldItem>,
  selectedValue: PaymentAddressFieldItem | undefined,
  onChangeText: (val?: PaymentAddressFieldItem) => void,
) => {
  const changeFieldOnPress = () => {
    Keyboard.dismiss();
    openModal({
      element: (
        <SelectTransferFieldModal
          name={name}
          confirm={onChangeText}
          selectedValue={selectedValue}
          fieldItems={fieldItems}
        />
      ),
      snapPoints: ['80%'],
      disablePanning: true,
      disableDynamicSizing: true,
    });
  };

  return { changeFieldOnPress };
};
