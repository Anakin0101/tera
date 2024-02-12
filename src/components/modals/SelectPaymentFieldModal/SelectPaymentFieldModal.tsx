import React, { FC, useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button } from 'components';
import { SelectPaymentFieldModalProps } from './SelectPaymentFieldModal.types';
import { useStyles } from './SelectPaymentFieldModal.styles';
import { closeModal } from 'utils/modal';
import { FieldItem } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { SelectPaymentFieldItem } from './SelectPaymentFieldItem';

export const SelectPaymentFieldModal: FC<SelectPaymentFieldModalProps> = ({
  fieldItems = [],
  confirm,
  selectedValue,
}) => {
  const styles = useStyles();
  const [selected, setSelected] = useState<string>(selectedValue);

  /**
   * Handles the press event for the selected item.
   * Calls the confirm function with the selected item and closes the modal.
   *
   * @function
   * @name handlePress
   * @memberof YourComponent
   * @returns {void}
   */
  const handlePress = useCallback(() => {
    confirm(selected);
    closeModal();
  }, [confirm, selected]);

  /**
   * Renders an item for the payment field list.
   *
   * @function
   * @name renderItem
   * @memberof YourComponent
   * @param {Object} params - The parameters for rendering an item.
   * @param {FieldItem} params.item - The field item to render.
   * @param {number} params.index - The index of the item in the list.
   * @returns {React.ReactNode} - The rendered React component for the item.
   */
  const renderItem = useCallback(
    /**
     * @param {Object} params
     * @param {FieldItem} params.item
     * @param {number} params.index
     */

    ({ item, index }: { item: FieldItem; index: number }) => (
      <SelectPaymentFieldItem
        fieldItem={item}
        onPress={setSelected}
        isSelected={selected === item.value}
        isLast={fieldItems?.length !== undefined && fieldItems?.length - 1 === index}
      />
    ),
    [fieldItems?.length, selected],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fieldItems}
        keyExtractor={(item, index) => item.key + index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listWrapper}
        showsVerticalScrollIndicator={false}
      />
      <Button.Primary
        fullWidth
        onPress={handlePress}
        text="common.select"
        customWrapperStyle={styles.button}
      />
    </View>
  );
};
