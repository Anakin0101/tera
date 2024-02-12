import React from 'react';
import { openModal } from 'utils/modal';
import { Keyboard } from 'react-native';
import { FieldItem } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { SelectPaymentFieldModal } from 'components/modals';

export const usePaymentFieldItemDropDown = (
  fieldItems: Array<FieldItem> | null,
  selectedValue: string,
  onChangeText: (val: string) => void,
) => {
  const changeFieldOnPress = () => {
    Keyboard.dismiss();
    openModal({
      element: (
        <SelectPaymentFieldModal
          confirm={onChangeText}
          selectedValue={selectedValue}
          fieldItems={fieldItems}
        />
      ),
      snapPoints: ['100%'],
    });
  };

  return { changeFieldOnPress };
};
