import React, { useCallback, useEffect, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { useStyles } from './PaymentFieldInput.styles';
import { ArrowDown } from 'assets/SVGs';
import { Divider } from 'components/Divider/Divider';
import { usePaymentFieldItemDropDown } from './Container';
import { PaymentDropDownFieldInputProps } from './PaymentFieldInput.types';
import { ErrorMessage } from 'components/TextInput/TextInput';
import { Controller } from 'react-hook-form';

export const PaymentDropDownFieldInput: React.FC<PaymentDropDownFieldInputProps> = ({
  item,
  value,
  onChangeText,
  subscriberFieldsValue,
  control,
  name,
  errors,
  rules,
}) => {
  const styles = useStyles();
  const showErrorUI = !!errors?.[name];

  const { changeFieldOnPress } = usePaymentFieldItemDropDown(
    item.fieldItems,
    value,
    onChangeText,
    subscriberFieldsValue,
  );

  const filteredFieldItems = useMemo(() => {
    return (
      item.fieldItems?.filter(val =>
        val.relations?.length
          ? val.relations.some(relation =>
              subscriberFieldsValue.some(
                mainItem =>
                  mainItem.id === relation.parentFieldId &&
                  mainItem.value === relation.parentFieldValue,
              ),
            )
          : true,
      ) || []
    );
  }, [item.fieldItems, subscriberFieldsValue]);

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
    return filteredFieldItems?.find(el => el.value === value)?.name;
  }, [filteredFieldItems, value]);

  const checkIfValueIsChanged = useCallback(() => {
    const currenObj = subscriberFieldsValue.find(field => field.id === item.id);
    const findCurrentObjKey = filteredFieldItems.find(field => field.key === currenObj?.key);

    if (currenObj?.value && !findCurrentObjKey) {
      onChangeText('', '');
    }
  }, [filteredFieldItems, item.id, onChangeText, subscriberFieldsValue]);

  useEffect(() => {
    if (filteredFieldItems.length > 0) {
      checkIfValueIsChanged();
    }
  }, [checkIfValueIsChanged, filteredFieldItems?.length]);

  return (
    <View>
      <Controller
        name={name}
        control={control}
        defaultValue={itemValue}
        rules={{ required: true, ...rules }}
        render={({ field: { onChange } }) => {
          return (
            <Pressable
              onPress={() => {
                changeFieldOnPress(onChange);
              }}
            >
              <View style={styles.container}>
                <View style={styles.content}>
                  <Text style={styles.headerTitle}>{item.name}</Text>
                  <Text style={styles.valueStyle}>{itemValue?.trim()}</Text>
                </View>
                <View>
                  <ArrowDown width={24} height={14} />
                </View>
              </View>
              <Divider marginTop={8} />
            </Pressable>
          );
        }}
      />
      <ErrorMessage name={name} errors={errors} label={item.name} showErrorUI={showErrorUI} />
    </View>
  );
};
