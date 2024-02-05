import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { useStyles } from './PaymentFieldInput.styles';
import { ArrowDown } from 'assets/SVGs';
import { Divider } from 'components/Divider/Divider';
import { usePaymentFieldItemDropDown } from './Container';
import { PaymentDropDownFieldInputProps } from './PaymentFieldInput.types';

export const PaymentDropDownFieldInput: React.FC<PaymentDropDownFieldInputProps> = ({
  item,
  value,
  onChangeText,
}) => {
  const styles = useStyles();

  const { changeFieldOnPress } = usePaymentFieldItemDropDown(item.fieldItems, value, onChangeText);

  /**
   * Memoized function to derive the display value for a specific item and value combination.
   * Maps through the field items and returns the name of the matching item value or an empty string if no match is found.
   *
   * @function
   * @name itemValue
   * @memberof YourComponent
   * @returns {string[]} - An array of display values for the given item and value combination.
   */
  const itemValue = useMemo(() => {
    return item.fieldItems?.map(el => (el.value === value ? el.name : ''));
  }, [item.fieldItems, value]);

  return (
    <Pressable onPress={changeFieldOnPress}>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTitle}>{item.name}</Text>
          <Text style={styles.valueStyle}>{itemValue}</Text>
        </View>
        <View>
          <ArrowDown width={24} height={14} />
        </View>
      </View>
      <Divider marginTop={8} />
    </Pressable>
  );
};
