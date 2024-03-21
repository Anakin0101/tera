import React, { useMemo } from 'react';
import { openModal } from 'utils/modal';
import { Keyboard } from 'react-native';
import { FieldItem } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { SelectPaymentFieldModal } from 'components/modals';
import { SubscriberFieldsValue } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen.types';

export const usePaymentFieldItemDropDown = (
  fieldItems: Array<FieldItem> | null,
  selectedValue: string,
  onChangeText: (val: string, key: string) => void,
  subscriberFieldsValue: SubscriberFieldsValue,
) => {
  const filteredFieldItems = useMemo(() => {
    return (
      fieldItems?.filter(item =>
        item.relations?.length
          ? item.relations.some(relation =>
              subscriberFieldsValue.some(
                mainItem =>
                  mainItem.id === relation.parentFieldId &&
                  mainItem.value === relation.parentFieldValue,
              ),
            )
          : true,
      ) || []
    );
  }, [fieldItems, subscriberFieldsValue]);

  const changeFieldOnPress = (cb: (val: string) => void) => {
    Keyboard.dismiss();
    if (filteredFieldItems?.length > 0) {
      openModal({
        element: (
          <SelectPaymentFieldModal
            confirm={(val: string, key: string) => {
              onChangeText(val, key);
              cb(key);
            }}
            selectedValue={selectedValue}
            fieldItems={filteredFieldItems}
          />
        ),
        snapPoints: ['100%'],
      });
    }
  };

  return { changeFieldOnPress };
};
