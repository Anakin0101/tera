import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { SelectCurrencyModalFieldItemProps } from './SelectCurrencyModal.types';
import { useStyles } from './SelectCurrencyModal.styles';
import { CheckCircle } from 'assets/SVGs';
import { getCurrencyIcon } from 'utils/currency';

export const SelectCurrencyModalFieldItem: FC<SelectCurrencyModalFieldItemProps> = memo(
  ({ item, setSelectedCurrency = () => {}, isSelected, isLast }) => {
    const styles = useStyles();

    return (
      <Pressable onPress={() => setSelectedCurrency(item)} style={styles.itemWrapper}>
        <View style={styles.itemContainer}>
          <Text style={[styles.itemTitle, isSelected && styles.itemSelected]}>
            {getCurrencyIcon(item)}
          </Text>
          {isSelected && <CheckCircle />}
        </View>
        {!isLast && <Divider marginTop={24} height={1} />}
      </Pressable>
    );
  },
);
